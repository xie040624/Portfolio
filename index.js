const express = require('express');
const path = require('path');
const createError = require('http-errors');

const app = express();

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static(path.join(__dirname, 'image')));

// --- Public pages ---
app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'html', 'portfolio.html'));
});

// 404
app.use((req, res, next) => next(createError.NotFound()));

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
});

// Start server
app.listen(3000, '0.0.0.0', () =>
    console.log(`Frontend running at http://localhost:3000`)
);