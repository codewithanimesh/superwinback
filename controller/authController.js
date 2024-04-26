import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import { JWT_SECRET } from '../config/config.js';
import transporter from '../utils/nodemailerConfig.js'


export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //here i check the temporary password is matched with the password
    const isTemporaryPassword = await bcrypt.compare(password, user.password);
    if (isTemporaryPassword) {
      // Prompt the user to reset their password
      return res.status(200).json({ message: 'Please reset your password' });
    }

    // Check if the provided password matches the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tempPassword = generateTempPassword();

    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    user.password = hashedTempPassword;
    await user.save();


    await transporter.sendMail({
      from: 'your_email@example.com',
      to: email,
      subject: 'Temporary Password for Resetting Your Password',
      text: `Your temporary password is: ${tempPassword}. Please use this password to log in and reset your password.`,
    });

    res.status(200).json({ message: 'Temporary password generated and sent to user email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};