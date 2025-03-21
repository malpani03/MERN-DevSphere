const express =require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/userModel');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const config = require('config');
const bcrypt = require('bcryptjs');
//@route GET api/auth
//@desc Test route
//@access Public
router.get('/',auth,async(req,res)=>{
    try{
        const user =await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});
//@route  POST api/auth
//@desc authenticate user and get token
//@access Public
// Define validation functions
const emailValidator = check('email', 'Please include a valid email').isEmail();
const passwordValidator = check('password', 'Password is required').exists();
router.post(
    "/",
    [emailValidator, passwordValidator],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            //See if user exists
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
            }

            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }

    }
);

module.exports=router;