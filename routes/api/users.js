const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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
    const { firstName, lastName, email, password } = req.body;
    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ mgs: 'User already esists' }] });
      }
      //Get users gravatar
      //Encrypt password
      //Return jsonwebtoken
      res.send('User Route');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
