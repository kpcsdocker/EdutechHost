const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// Create a write stream (in append mode) for access logs
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Custom format function to include timestamps and filter out static assets
const customFormat = (tokens, req, res) => {
    const url = tokens.url(req, res);
    
    // Define static asset paths to exclude
    const staticAssetPaths = [
        '/assets/css/',
        '/assets/js/',
        '/styles.css',
        '/runtime.js',
        '/polyfills.js',
        '/vendor.js',
        '/main.js'
    ];
    
    // Exclude static asset requests from logging
    if (staticAssetPaths.some(path => url.startsWith(path))) {
        return null;
    }

    // Return formatted log entry with timestamp
    return [
        new Date().toISOString(), // Timestamp
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
};

// Setup the logger with the custom format function
app.use(morgan(customFormat, { stream: accessLogStream }));

// Serve only the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/EDUTechUI')));

// Define routes for specific endpoints
app.get('/auth/login/oauth2/code/google', (req, res) => {
    // Handle OAuth2 callback for Google login
    console.log("calling oauth2 from UI");
    res.send('Handling OAuth2 callback for Google login');
});

// Serve Angular's index.html for any other requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/EDUTechUI/index.html'));
});

const PORT = process.env.PORT || 80; // Use process.env.PORT for production or default to port 80
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
