const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Post, User, Comment } = require('../../models');

// route to get all posts on homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// route to get to dashboard
router.get('/dashboard', async (req, res) => {
    if (req.session.user) {
        try {
            const postData = await Post.findAll({
                where: {
                    userId: req.session.user.id,
                }
            });
    
            posts = postData.map(post => post.get({plain: true}))
            res.render('dashboard', {
                posts,
                logged_in: req.session.logged_in
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
        res.redirect('/login');
    }
});


// route to get one post
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [User, {
                model: Comment,
                include: [User] 
            }]
        });
        const post = postData.get(({ plain: true }))
        
        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });
        // res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// CREATE POSTS
// ============================================

// router to get create
router.get('/create', (req, res) => {
    res.render('create');
});

// route to post a post
router.post('/create', async (req, res) => {
    try {
        await Post.create({
            ...req.body,
            userId: req.session.user.id
        });

        const allPostData = await Post.findAll({
            where: {
                userId: req.session.user.id
            }
        });
        posts = allPostData.map(post => post.get({ plain: true }))

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// route to delete a post
router.delete('/posts/:id', async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        const allPostData = await Post.findAll({
            where: {
                userId: req.session.user.id
            }
        });
        posts = allPostData.map(post => post.get({ plain: true }))

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// route to display an editable post
router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });

        res.render('edit', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to edit a post
router.put('/edit/:id', async (req, res) => {
    try {
        await Post.update({
            title: req.body.title,
            body: req.body.body
        },{
            where: {
                id: req.params.id
            }
        });

        const allPostData = await Post.findAll({
            where: {
                userId: req.session.user.id
            }
        });
        posts = allPostData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// CREATE COMMENT
// ============================================

// route to post a comment
router.post('/posts/:id', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            userId: req.session.user.id,
            postId: req.params.id
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// LOGIN / LOGOUT / SIGNUP
// ============================================

// route to get to login
router.get('/login', async (req, res) => {
    res.render('login');
});

// log in route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username }
        });
        
        if (!userData) {
            res.status(403).json({
                message: 'Incorrect username or password!'
            });
        } else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, userData.password);
            if (isPasswordCorrect) {
                req.session.user = {
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                    logged_in: true
                }
                res.status(200).json(userData);
            } else {
                res.status(403)
            };
        };
        
    } catch (err) {
        res.status(500).json(err);
    }
});

// log out route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// route to get to sign up
router.get('/signup', (req, res) => {
    res.render('signup');
});

// route to post to sign up
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            ...req.body
        });

        req.session.user = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            logged_in: true
        };
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;