const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "riser@"
const fetchuser = require("../middleware/fetchuser");



//ROUTE 1: create user using: POST "/api/auth/createuser" . no login required
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 }),

], async (req, res) => {
    let success = false;
    //if there are error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // check whetherthe user with the same email exits already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry a user with this email already exits' })
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        // Creat a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        success = true;
        res.json({success, authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
})

//ROUTE 2: Authenticate user using: POST "/api/auth/login" . no login required
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    //if there are error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({success, erro: "Please try to login with correct credentials" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password)
        // console.log("password", password)
        // console.log("user password", user.password)
        // console.log("user id ",user.id)
        if (!passwordcompare) {
            success = false;
            return res.status(400).json({ success, erro: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }

})

//ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser" . login required
router.post("/getuser",fetchuser,  async (req, res) => {
try {
    userId =req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
}

})

module.exports = router