// server.js
console.log('Starting server...');
require('dotenv').config();

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}
console.log("Environment:", process.env.NODE_ENV);

const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Sequelize = require('sequelize');
const config = require('./config/config');
const { sequelize, User, Flight, Trip } = require('./models'); // Ensure all models are imported

const app = express();
const PORT = process.env.PORT || 3002;

const env = process.env.NODE_ENV || 'development';
console.log("Environment:", env);

let sequelizeInstance;
if (env === 'production') {
    console.log("Using JAWSDB_URL for production database connection.");
    sequelizeInstance = new Sequelize(process.env.JAWSDB_URL, {
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: true
    });
} else {
    console.log("Using local database configuration.");
    sequelizeInstance = new Sequelize(config[env].database, config[env].username, config[env].password, {
        host: config[env].host,
        dialect: 'mysql',
        logging: true
    });
}

sequelizeInstance.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sess = {
    secret: process.env.SESSION_SECRET || 'TechBlog secret',
    cookie: {},
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000
    }),
    resave: false,
    saveUninitialized: true
};

sess.store.sync().catch(err => {
    console.error('Error setting up session store:', err);
});
app.use(session(sess));
console.log('Session middleware configured.');

const homeRoutes = require('./controllers/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/api/flightRoutes');
const tripRoutes = require('./routes/api/tripRoutes');
app.use(homeRoutes);
app.use(authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/trips', tripRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('search', { logged_in: req.session.logged_in });
});

app.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    try {
        await sequelizeInstance.sync({ force: false });
        console.log('Database tables created or updated!');
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
});
