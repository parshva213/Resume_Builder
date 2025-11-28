import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import bcrypt from 'bcrypt';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'reactra',
    password: process.env.PGPASSWORD || 'PARSHVAshah',
    port: Number(process.env.PGPORT) || 2103
});

// Health check
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ ok: true, message: 'Database connected successfully' });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email, name, and password are required'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            error: 'Password must be at least 6 characters long'
        });
    }

    try {
        // Check if user already exists
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Account already exists with this email'
            });
        }

        // Hash password
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const { rows } = await pool.query(
            `INSERT INTO users (email, name, password_hash) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, name, created_at`,
            [email, name, password_hash]
        );

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: rows[0]
        });
    } catch (e) {
        console.error('Signup error:', e);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email and password are required'
        });
    }

    try {
        // Find user by email
        const { rows } = await pool.query(
            'SELECT id, email, name, password_hash FROM users WHERE email = $1',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'Account not found'
            });
        }

        const user = rows[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'Incorrect password'
            });
        }

        // Remove password_hash from response
        delete user.password_hash;

        res.json({
            success: true,
            message: 'Login successful',
            user
        });
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get user resumes
app.get('/api/resumes/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const { rows } = await pool.query(
            'SELECT id, title, content, created_at, updated_at FROM resumes WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({
            success: true,
            resumes: rows
        });
    } catch (e) {
        console.error('Get resumes error:', e);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Save resume
app.post('/api/resumes', async (req, res) => {
    const { user_id, title, content } = req.body;

    if (!user_id || !title || !content) {
        return res.status(400).json({
            success: false,
            error: 'User ID, title, and content are required'
        });
    }

    try {
        const { rows } = await pool.query(
            `INSERT INTO resumes (user_id, title, content) 
       VALUES ($1, $2, $3::jsonb) 
       RETURNING id, user_id, title, created_at`,
            [user_id, title, JSON.stringify(content)]
        );

        res.status(201).json({
            success: true,
            message: 'Resume saved successfully',
            resume: rows[0]
        });
    } catch (e) {
        console.error('Save resume error:', e);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Update resume
app.put('/api/resumes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            error: 'Title and content are required'
        });
    }

    try {
        const { rows } = await pool.query(
            `UPDATE resumes 
       SET title = $1, content = $2::jsonb, updated_at = NOW() 
       WHERE id = $3 
       RETURNING id, user_id, title, updated_at`,
            [title, JSON.stringify(content), id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Resume not found'
            });
        }

        res.json({
            success: true,
            message: 'Resume updated successfully',
            resume: rows[0]
        });
    } catch (e) {
        console.error('Update resume error:', e);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Delete resume
app.delete('/api/resumes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(
            'DELETE FROM resumes WHERE id = $1 RETURNING id',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Resume not found'
            });
        }

        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (e) {
        console.error('Delete resume error:', e);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));


