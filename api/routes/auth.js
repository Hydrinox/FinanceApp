const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport-setup');

var isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/fail');
    }
}

router.get('/auth/fail', (req, res) => {
    res.send(false);
});
router.get('/auth', isLoggedIn, (req, res) => {
    res.send(true);
});
router.get('/auth/user', isLoggedIn, function (req, res) {
    res.status(200).send(req.user);
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/fail' }),
    function (req, res) {
        var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            user: req.user
        }));
        res.status(200).send(responseHTML);
    });

router.get('/auth/logout', (req, res) => {
    req.session.destroy();
    req.logout();
    res.clearCookie('connect.sid');
    req.session = null;
    res.redirect('/auth/fail');
})

module.exports = router;
