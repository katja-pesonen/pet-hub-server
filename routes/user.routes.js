const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");



// Get one specific user

router.get('/profile', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload
  console.log(req.payload, 'Payload of user')

    try {
  
    const user = await User.findById(id)
    const {username, email} = user
    res.json({username, email, id})
  }   catch(error) {console.log( "error in profile", error)
}
})



//export here 👇


module.exports = router;