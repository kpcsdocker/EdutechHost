const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'dist/EDUTechUI')));

// Define routes for specific endpoints
app.get('/auth/login/oauth2/code/google', (req, res) => {
    // Handle OAuth2 callback for Google login
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
