const sequelize = require("../config/connection");
const db = require("../models");

const seedMe = async () => {
    await sequelize.sync({ force: true });
    await db.User.bulkCreate([
        {
            username: "kkolyvek",
            email: "koppi@koppi.com",
            password: "password"
        },
        {
            username: "Mia",
            email: "mia@koppi.com",
            password: "password1"
        },
        {
            username: "Lilly",
            email: "lilly@koppi.com",
            password: "password2"
        }
    ]);

    await db.Post.bulkCreate([
        {
            title:"firstPost",
            body:"content for first post",
            userId: 1,
        },
        {
            title:"secondPost",
            body:"content for second post",
            userId: 1,
        },
        {
            title:"thirdPost",
            body:"content for third post",
            userId: 2,
        },
    ]);

    await db.Comment.bulkCreate([
        {
            body:"content for first comment",
            postId: 1,
            userId: 1,
        },
        {
            body:"content for second comment",
            postId: 1,
            userId: 1,
        },
        {
            body:"content for third comment",
            postId: 1,
            userId: 1,
        },
    ]);

    console.log('seeded');
    process.exit(0);
};

seedMe()
