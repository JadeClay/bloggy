const express = require("express");
const passport = require("./auth/auth");
const router = express.Router();
const jwt = require('jsonwebtoken');

/*Importing all mongodb models */
const Post = require('./Models/Post');
const User = require('./Models/User');

/* Authentification routes */

router.post("/register", function (req, res) {
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(user, (er) => {
                if (er) {
                    res.json({ success: false, message: er });
                }
                else {
                    res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
});

/* TODO: Send a cookie with the JWT, and entire JWT logic*/
router.post('/login', (req, res) => {
    if (!req.body.username) {
        res.json({ success: false, message: "Username was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }
    else {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.status(500).json({ success: false, message: "username or password incorrect" });
                }
                else {
                    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET, { expiresIn: "24h" });
                    console.log(jwt.verify(token, process.env.SECRET)); 
                    res.status(200).json({ success: true, message: "Authentication successful", token: token });
                }
            }
        })(req, res);
    }
});

router.get("/me", (req, res, next) => {
    res.send(req.user)
})
/* Posts routes */

router.get('/posts/last', async (req, res) => {
    const all = await Post.find({}).limit(1).sort({ _id: -1}).lean();
    res.status(200).send(all);
})

router.get('/hello', (req, res) => {
    res.status(200).send({body: "Hello World"});
})

module.exports = router