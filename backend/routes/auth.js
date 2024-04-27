const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const SECRET = 'asjk@pli%^iw987wdkn';

router.post('/register', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password should be atleast 6 characters').isLength({ min: 6 }),
    body('phone', 'Enter a valid phone number').isLength({ min: 10, max: 10 })], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : hashedPassword,
                phone : req.body.phone
            })

            res.status(201).send({msg : 'User created successfully'});
        } catch (error) {
            console.error(error.message);
            res.status(500).send({errors : 'Internal Server Error'});
        }
    })

    router.post('/login', [
        body('email', 'Email is required').isEmail(),
        body('password', 'Password should be atleast 6 characters').isLength({ min: 6 })], 
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'User not found' }] });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if(!passwordCompare){
                return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
            }

            const data = {
                user : {
                    id : user._id
                }
            }

            const sendUser = {
                name : user.name,
                email : user.email,
                phone : user.phone,
                date : user.date,
                id: user._id
            }

            const auth_token = jwt.sign(data, SECRET);
            res.status(201).json({auth_token, sendUser});
        } catch (error) {
            console.error(error.message);
            res.status(500).send({errors: 'Internal Server Error'});
        }
    })

    router.get("/getuser", fetchuser, async(req,res)=>{
        try {
            const user = await User.findOne({_id : req.user.id})
            res.status(200).json(user)
         } catch (error) {
             console.error(error.message)
         }
    })

    router.get("/getUserFromID/:id",  async(req,res)=>{
        try {
            const user = await User.findOne({_id : req.params.id})
            res.status(200).json(user)
         } catch (error) {
             console.error(error.message)
         }
    })


module.exports = router;