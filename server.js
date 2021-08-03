const express = require('express');
const sequelize = require("./config/connection")
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers');
const helpers = require('./utils/helpers');
// Sets up the Express App
// =============================================================
const app = express();
const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*60*2
    },
    store: new SequelizeStore({
        db: sequelize,
    })
}));

app.use('/', allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});