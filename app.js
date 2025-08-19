const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static('public'));

// Templeting engines with custom helpers
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        substring: function(str, start, end) {
            if (str && typeof str === 'string') {
                return str.substring(start, end);
            }
            return '';
        },
        formatDate: function(date) {
            if (date) {
                return new Date(date).toLocaleDateString();
            }
            return 'N/A';
        },
        eq: function(a, b) {
            return a === b;
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME,
});

// Check database connection and set up routes accordingly
let databaseConnected = false;

pool.getConnection((err, connection) => {
    if(err) {
        console.error('❌ Database connection failed:', err.message);
        console.log('📋 Please ensure MySQL is running and configured properly:');
        console.log('   - Host:', process.env.DB_HOST || 'localhost');
        console.log('   - Database:', process.env.DB_NAME || 'lib');
        console.log('   - User:', process.env.DB_USER || 'root');
        console.log('🎭 Starting in DEMO MODE with sample data...');
        console.log('💡 To use real database, please configure MySQL and restart the server.');
        
        // Use demo routes when database is not available
        const demoRoutes = require('./server/routes/demo');
        app.use('/', demoRoutes);
        return;
    }
    
    console.log('✅ Database connected successfully as ID ' + connection.threadId);
    connection.release();
    databaseConnected = true;
    
    // Use real database routes when connection is successful
    const routes = require('./server/routes/user');
    app.use('/', routes);
});

app.listen(port, () => console.log(`Listening on port ${port}`));