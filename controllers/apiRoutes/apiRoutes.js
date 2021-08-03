const router = require('express').Router();
// const bcrypt = require('bcrypt');
const { Post, User, Comment } = require('../../models/');

// POSTS
// ============================================
// route to get all posts
router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    };
});

// route to get one post with comments
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [User, {
                model: Comment,
                include: [User] 
            }]
        });
        const post = postData.get({ plain: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to get a users posts
router.get('/posts/users/:id', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.params.id,
            }
        });

        posts = postData.map(post => post.get({plain: true}))
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            body: req.body.body
        },{
            where: {
                id: req.params.id
            }
        });

        // post = postData.get({ plain: true })
        res.status(200).json(postData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})


// USERS
// ============================================
router.get('/users', async (req, res) => {
    try {
        const userData = await User.findAll({
            // include: [Post]
        });
        const users = userData.map(user => user.get({ plain: true }));
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    };
})

// COMMENTS
// =============================================
router.get('/comments', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map(comment => comment.get({plain:true}));
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;