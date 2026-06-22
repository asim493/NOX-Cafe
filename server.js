const express = require('express');
const path = require('path');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Establish SQLite Database Connection
const dbPath = path.join(__dirname, 'nox_cafe.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('[DATABASE ERROR]: Matrix linkage failed. Verify your service execution status:\n', err.message);
        process.exit(1);
    } else {
        console.log('[DATABASE SYSTEM]: Relational interface communication link established.');
    }
});

// Enable foreign keys and busy timeout
db.configure('busyTimeout', 5000);

// 2. Session Tracking Allocation Middleware
app.use(session({
    secret: 'nox_cafe_crypto_matrix_string_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 30, 
        secure: false, 
        httpOnly: true 
    }
}));

const checkAuthentication = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
};

// 3. System Route Handling Policies
app.get('/login', (req, res) => {
    if (req.session && req.session.isAuthenticated) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/', checkAuthentication, (req, res) => {
    res.sendFile(path.join(__dirname, 'secure', 'index.html'));
});

/* Secure Identity Access Matrix Verification Route */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing parameters.' });
    }

    // Secure Parameterized Query Structure checking against SQL Injection
    db.get(
        'SELECT * FROM operators WHERE username = ? AND password = ? LIMIT 1',
        [username, password],
        (err, row) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database query execution failure.' });
            }

            if (row) {
                req.session.isAuthenticated = true;
                req.session.operator = row.username;
                return res.json({ success: true, redirectTo: '/' });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid identity validation signatures.' });
            }
        }
    );
});

/* Optional API Endpoint to fetch the 16 codes dynamically */
app.get('/api/codes', checkAuthentication, (req, res) => {
    db.all('SELECT * FROM safe_codes', (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to extract active keys.' });
        }
        res.json({ success: true, keys: rows });
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => res.redirect('/login'));

app.listen(PORT, () => {
    console.log(`[NOX SYSTEM ONLINE]: Secure node running at http://localhost:${PORT}`);
});