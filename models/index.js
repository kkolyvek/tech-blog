const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');

// Each user can have many posts
Post.belongsTo(User, {
    foreignKey: 'userId'
});

// User.hasMany(Post);
// Post.belongsTo(User);

// Each post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'postId'
});

// Each user can have many posts
Comment.belongsTo(User, {
    foreignKey: 'userId'
});

// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// });

module.exports = {
    User,
    Post,
    Comment
};