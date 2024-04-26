import express from 'express';
import { signup, login, forgotPassword } from "../controller/authController.js"

import passport from 'passport';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword); //this is new route for forget password

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // if the user  Successful authentication,it will redirect to home or send response
  res.redirect('/'); 
});

export default router;
