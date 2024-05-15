const express = require("express");
const router = express.Router();
const User = require('../../models/userModel')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");

// Define validation functions
const nameValidator = check("name", "Name is required").not().isEmpty();
const emailValidator = check('email', 'Please include a valid email').isEmail();
const passwordValidator = check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 });

//@route  POST api/users
//@desc Register user
//@access Public
router.post(
    "/",
    [nameValidator, emailValidator, passwordValidator],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            //See if user exists
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            //get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            //encrypt password
            const salt = await bcrypt.genSalt(12);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

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

module.exports = router;