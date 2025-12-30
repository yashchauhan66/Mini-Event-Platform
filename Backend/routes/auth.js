import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';


const router = express.Router();


router.post('/signup',auth, async (req, res) => {
const hashed = await bcrypt.hash(req.body.password, 10);
const user = await User.create({ email: req.body.email, password: hashed });
res.json(user);
});


router.post('/login',auth, async (req, res) => {
const user = await User.findOne({ email: req.body.email });
if (!user) return res.status(400).json({ message: 'User not found' });


const match = await bcrypt.compare(req.body.password, user.password);
if (!match) return res.status(400).json({ message: 'Wrong password' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
res.json({ token });
});


export default router;