const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session handling configuration
app.use(session({
    secret: 'nox_cafe_crypto_matrix_string_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 30, // 30-minute expiration
        secure: false, // Set to true if running over HTTPS
        httpOnly: true // Mitigates XSS token theft
    }
}));

// Mock Database Credentials
const OPERATOR_CREDENTIALS = {
    username: 'nox_root',
    password: 'password123'
};

/* Authorization Guard Middleware */
const checkAuthentication = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
};

// 1. Explicit Routing Policies
app.get('/login', (req, res) => {
    // If already authenticated, skip login and head to the matrix
    if (req.session && req.session.isAuthenticated) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Secure endpoint serves index from private folder layer ONLY after passing guard
app.get('/', checkAuthentication, (req, res) => {
    res.sendFile(path.join(__dirname, 'secure', 'index.html'));
});

/* Core Authentication Endpoint */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing credentials' });
    }

    if (username === OPERATOR_CREDENTIALS.username && password === OPERATOR_CREDENTIALS.password) {
        req.session.isAuthenticated = true;
        req.session.operator = username;
        
        return res.json({ 
            success: true, 
            message: 'Identity verified.', 
            redirectTo: '/' 
        });
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid runtime credentials.' 
        });
    }
});

// Optional: Explicit logout route to clear sessions cleanly
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// 2. Public Static Assets (Contains ONLY login.html now, making index.html invisible here)
app.use(express.static(path.join(__dirname, 'public')));

// Global fallback catcher routing miscellaneous targets back to gateway
app.get('*', (req, res) => {
    res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(`[NOX SYSTEM ONLINE]: Secure node running at http://localhost:${PORT}`);
});
