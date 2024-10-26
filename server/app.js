// server/app.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

// Endpoint to extract thumbnail URLs
app.post('/api/thumbnail', (req, res) => {
    const videoUrl = req.body.url;

    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    if (!videoId) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const thumbnails = {
        low: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        max: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };

    res.json(thumbnails);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
