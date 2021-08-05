const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    return res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signp',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    return res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    return res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    return res.redirect('/signin');
});

module.exports = router;
