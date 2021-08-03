const sequelize = require("../config/connection");
const db = require("../models");

const seedMe = async () => {
    await sequelize.sync({ force: true });
    await db.User.bulkCreate([
        {
            username: "Koppi",
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
            title:"Using Handlebars",
            body:"Just recently learned about using handlebars to create modular views for your web applications. If you haven't heard of it yet, definitely check it out!",
            userId: 1,
        },
        {
            title:"Bootstrap's Cards",
            body:"I love using Bootstrap's pre-build cards, I think they're pretty and get information across to the user really well. Does anyone else feel the same way? Let me know in the comments.",
            userId: 2,
        },
    ]);

    await db.Comment.bulkCreate([
        {
            body:"Great suggestion, I'll definitely go check it out.",
            postId: 1,
            userId: 2,
        },
        {
            body:"Personally I like to use carousels, but I can see how that would be overkill for a lot of things.",
            postId: 2,
            userId: 1,
        },
        {
            body:"No.",
            postId: 1,
            userId: 3,
        },
    ]);

    console.log('seeded');
    process.exit(0);
};

seedMe()
