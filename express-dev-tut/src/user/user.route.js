import express from 'express';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { User } from './user.model.js'; // Adjust import as per your module
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';  // Import auth middleware
import dotenv from 'dotenv';
dotenv.config();

const userRouter = express.Router();

// Route for updating user (requires authentication)
userRouter.post('/:userId', auth, async (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Please provide name and email.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        let updateData = { name, email };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            updateData.password = hashedPassword;
        }
        
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong while updating the user.' });
    }
});

// Route for user login (no auth middleware)
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        console.log("User found:", user);

        // Compare passwords asynchronously
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        console.log("Token generated:", token);

        // Return token
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong while logging in.' });
    }
});

// Route for user registration (no auth middleware)
userRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email and password.' });
    }

    try {
        // Generate a salt and hash the password asynchronously
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const user = await User.create({ name, email, password: hash });

        res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong while creating the user.' });
    }
});

export default userRouter;