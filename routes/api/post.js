const express = require('express');
const { check, validationResult} = require("express-validator");
const auth = require('../../middleware/auth');
const router = express.Router();

const Post = require('../../models/Post')
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/post
// @desc    Create a post
// @access  Private
router.post('/', [auth, [check('text','Text is require').not().isEmpty()]], async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        const post = new Post(newPost);
        await post.save();

        res.json(post);
    } catch(err) {
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/post/comment/:id/:comment_id
// @desc    Delete Comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try {

        //get post
        const post = await Post.findById(req.params.id);

        //find comment index
        const comment = post.comments.find(comment => comment._id == req.params.comment_id);

        if(!comment) {
            return res.status(404).json({msg: 'Comment not found'});
        }


        //check user 
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/post
// @desc    Get all post
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1})

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.statut(500).send('Server Error');
    }
});


// @route   GET api/post/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        res.json(post);
    } catch (err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        console.error(err.message);
        res.statut(500).send('Server Error');
    }
});

// @route   PUT api/post/like/:id
// @desc    Like toggle
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        if (post.likes.findIndex(like => like.id == req.user.id) !== -1) {
            const index = post.likes.findIndex(like => like.id == req.user.id);
            console.log(index);
            post.likes.splice(index, 1);
            await post.save();
            return res.status(200).json(post.likes);
        }

        post.likes.push(req.user.id);
        await post.save();

        res.status(200).json(post.likes);

    } catch (err) {
        console.error(err.message);
        if(err.type === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).json({msg: "Server Error"})
    }
})

// @route   POST api/post/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', [auth, [check('text','Text is require').not().isEmpty()]], async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({msg : 'Cannot find post'});
        }

        const user = await User.findById(req.user.id).select('-password');

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch(err) {
        if (err.type === 'ObjectId') {
            return res.status(404).json({msg : 'Cannot find post'});
        }
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/post/:id
// @desc    Delete post by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({msg: 'Post not found'})
        }
        
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await Post.findOneAndRemove({ user: req.user.id });

        res.json({msg: "Post deleted"})
    } catch (err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        console.error(err.message);
        res.statut(500).send('Server Error');
    }
});



module.exports = router;