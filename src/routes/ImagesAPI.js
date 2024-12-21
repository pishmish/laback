const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Configure image directory path
const imagesPath = path.join(__dirname, '../assets/images');

// Serve static files from the images directory
router.use('/', express.static(imagesPath));

// Get specific image by name
router.get('/:imageName', (req, res) => {
    let { imageName } = req.params;
    // lowercase and replace spaces with hyphens
    imageName = imageName.toLowerCase().replace(/\s+/g, '-');

    // read the directory for matching file (ignoring extension)
    const files = fs.readdirSync(imagesPath);
    const matchedFile = files.find(file => {
        const baseName = path.parse(file).name.toLowerCase();
        return baseName === imageName;
    });

    if (matchedFile) {
        res.sendFile(path.join(imagesPath, matchedFile));
    } else {
        res.status(404).send('Image not found');
    }
});

module.exports = router;