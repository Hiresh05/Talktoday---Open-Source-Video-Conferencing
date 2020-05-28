const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/list",(req,res)=>{
    User.find().exec().then((data)=> res.json(data))

})
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,  
        activate: false
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    if(!user.activate){
      return res.status(404).json({NotActivated : "Please ask admin to activate account"})
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/admin", (req, res) => {
  // Form validation
  if(req.body.email!= 'Admin')
  { return res.status(404).json({emailnotfound : "Not an Admin"})}

  if(req.body.password!= 'Admin123')
  {return res
    .status(404)
    .json({ passwordincorrect: "Password incorrect" });}
    const payload = {
      id: 'ADMIN',
      name: 'ADMIN'
    };

    // Sign token
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 300 // 1 year in seconds
      },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      }
    );


  // const { errors, isValid } = validateLoginInput(req.body);

  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  // const email = req.body.email;
  // const password = req.body.password;

  // // Find user by email
  // User.findOne({ email }).then(user => {
  //   // Check if user exists
  //   if (!user) {
  //     return res.status(404).json({ emailnotfound: "Email not found" });
  //   }

  //   // Check password
  //   bcrypt.compare(password, user.password).then(isMatch => {
  //     if (isMatch) {
  //       // User matched
  //       // Create JWT Payload
  //       const payload = {
  //         id: user.id,
  //         name: user.name
  //       };

  //       // Sign token
  //       jwt.sign(
  //         payload,
  //         keys.secretOrKey,
  //         {
  //           expiresIn: 300 // 1 year in seconds
  //         },
  //         (err, token) => {
  //           res.json({
  //             success: true,
  //             token: "Bearer " + token
  //           });
  //         }
  //       );
  //     } else {
  //       return res
  //         .status(400)
  //         .json({ passwordincorrect: "Password incorrect" });
  //     }
  //   });
  // });
});

router.post("/activateUser",(req,res)=>{
console.log(req.body)
for(i in req.body){
  User.where({ _id: req.body[i]._id }).updateOne({ activate:true })
    .then(data => console.log(data))
    .catch(err => console.log(err))
  // let red = User.findOneAndUpdate({ _id: req.body[i]._id }, { activate:true }, {
  //     new: true
  //   })
  //   console.log(red)

}
  //User.where({ _id: id }).update({ activate:true })


})

router.post("/inactivateUser",(req,res)=>{
  console.log(req.body)
    User.where({ _id: req.body._id }).updateOne({ activate:false })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  })

module.exports = router;
