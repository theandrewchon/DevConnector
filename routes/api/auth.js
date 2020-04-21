const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const db = require('../../models');

//@route    GET api/auth
//@desc     Test Route
//@access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await await db.User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
