const express = require("express");
const passport = require("./auth/auth");
const router = express.Router();
const jwt = require('jsonwebtoken');
var fs = require('fs');

/* Bloggy Libraries */
const InfoMessages = require('./Utils/Error');

/*Importing all mongodb models */
const Post = require('./Models/Post');
const User = require('./Models/User');
const Author = require('./Models/Author');

/* Authentification routes */

router.post("/register", (req, res) => {
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            InfoMessages.Warning(err);
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(user, (er) => {
                if (er) {
                    InfoMessages.Warning(er);
                    res.json({ success: false, message: er });
                }
                else {
                    res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
});

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
                InfoMessages.Error(err);
                res.status(500).json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.status(500).json({ success: false, message: "username or password incorrect" });
                }
                else {
                    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET, { expiresIn: "24h" });
                    InfoMessages.Info(token);
                    console.log(jwt.verify(token, process.env.SECRET)); 
                    res.status(200).cookie('token', token).json({ success: true, message: "Authentication successful", username: user.username, token: token });
                }
            }
        })(req, res);
    }
});

router.get('/logout', (req, res) => {
    res.status(200).clearCookie('token').send({ success: true, message: "Logged out succesfully" });
});

router.get("/me", (req, res, next) => {
    if(req.cookies.token) res.send(jwt.verify(req.body.token, process.env.SECRET));
    else res.status(404).send({ success: false, message: "Username not found"});
})

router.get("/accounts/all", async (req, res) => {
    
    try {
        const Accounts = await User.find({}, {salt:0, hash:0}).lean().exec();

        res.json({Accounts});
    } catch (error) {
        console.error(error);
        res.status(404);
    }

})

router.delete("/accounts/delete", async (req, res) => {
    const AccountId = req.body.id;

    try{
        const AccountDeleted = await User.findByIdAndDelete(AccountId).exec();

        res.status(200).send({success: true, message: AccountDeleted});
    } catch (error) {
        console.error(error);
        res.status(404).send({message: error})
    }

})

/* Posts routes */

router.get("/posts/all", async (req, res) => {
    
    try {
        const Posts = await Post.find().lean().exec();

        res.json({Posts});
    } catch (error) {
        console.error(error);
        res.status(404);
    }

})

router.patch("/posts/edit/:id", async (req, res) => {
    const PostId = req.params.id;
    
    try {
        const PostLooked = await Post.findById(PostId).exec();
        PostLooked.title = req.body.title;
        PostLooked.body = req.body.body;
        
        await PostLooked.save();

        console.log(PostLooked);

        res.json({success: true});
    } catch (error) {
        console.error(error);
        res.status(404).end();
    }

})

router.get("/posts/find/:id", async (req, res) => {
    const PostId = req.params.id;
    
    try {
        const PostLooked = await Post.findById(PostId).exec();

        res.json({success: true, PostLooked});
    } catch (error) {
        console.error(error);
        res.status(404);
    }

});

router.delete("/posts/delete", async function (req, res){
    
    const postId = req.body.id;

    try{
        const PostToDelete = await Post.findByIdAndDelete(postId).exec();

        res.status(200).send({success: true, message: PostToDelete});
    } catch (error) {
        console.error(error);
        res.status(404).send({message: error})
    }

})

router.get("/posts/all", async function (req, res) {
    const { page = 1, limit = 10} = req.query;

    try {
        const Posts = await Post.find().limit(limit * 1).skip((page - 1) * limit).exec();

        // get total documents in the Post collection

        const count = await Post.countDocuments();

        // return response with posts, total pages, and current page
        res.json({
            Posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
      console.error(err.message);
    }
});

router.post("/posts/create", function (req, res) {
    const NewPost = new Post({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        hidden: false
    })

    NewPost.save().then((result) => res.status(200).send({ success: true, message: "Post has been created succesfully", result: result }))
                  .catch((error) => { console.error(error); res.status(500).send({success: false, message: "There has been an error", result: error})})
});

router.get('/posts/last', async (req, res) => {
    const all = await Post.find().limit(1).sort({ _id: -1}).lean();
    res.status(200).send(all);
})

/* Background Upload Route */

router.post('/upload/background', async function (req, res) {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let background = req.files.background;
            
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            background.mv('./public/images/' + "background.jpg");

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: background.name,
                    mimetype: background.mimetype,
                    size: background.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

/* Author Routes */

router.post("/author/edit", async (req, res) => {
    const name = req.body.author;
    const description = req.body.description;

    var author = {
        author: name,
        description: description
    }

   fs.writeFile('./public/author.json', JSON.stringify(author), (err) =>{
    InfoMessages.Warning(err);
   });

   res.status(200).send({success: true, author: author});

});

module.exports = router