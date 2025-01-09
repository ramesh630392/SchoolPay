const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:5173', 
}));


// Middleware
app.use(bodyParser.json());

// Database Setup
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for in-memory DB, or 'database.db' for file-based DB

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);
    console.log('Users table created.');
});

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Routes

/** Signup API */
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.run(query, [username, hashedPassword],  (err)=> {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(400).json({ error: 'Username already exists.' });
                }
                return res.status(500).json({ error: 'Database error.' });
            }
            res.status(201).json({ message: 'User registered successfully.' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
});

/** Login API */
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Fetch user from the database
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        try {
            // Compare the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid username or password.' });
            }

            // Generate JWT
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful.', token });
        } catch (error) {
            res.status(500).json({ error: 'Server error.' });
        }
    });
});

app.get('/', (req, res)=>{
    res.send("this is get request")
} )

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
