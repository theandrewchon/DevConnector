const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const db = require('../../models');

//@route    GET api/auth
//@desc     Test Route
//@access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await db.User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/auth
//@desc     Authenticate user and get token
//@access   Public

router.post(
  '/',
  [
    //User model input validation
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Send bad request with error message
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;
    try {
      //See if user exists
      let user = await db.User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ mgs: 'Invalid credentials' }] });
      }

      //Compare plaintext password to encrypted password pulled from database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ mgs: 'Invalid credentials' }] });
      }

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id, //MongoDB user _id. Mongoose abstraction layer translates _id to id
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
