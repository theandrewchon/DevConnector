const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const db = require('../../models');
const router = express.Router();

//@route    POST api/users
//@desc     Register User
//@access   Public

const User = require('../../');
router.post(
  '/',
  [
    //User model input validation
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('position', 'Position is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Send bad request with error message
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { firstName, lastName, email, password, position } = req.body;
    try {
      //See if user exists
      let user = await db.User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ mgs: 'User already esists' }] });
      }

      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new db.User({
        firstName,
        lastName,
        email,
        position,
        avatar,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Save user to database
      await user.save();
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
