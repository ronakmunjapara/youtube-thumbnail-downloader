// public/script.js

document.getElementById('fetchThumbnail').addEventListener('click', () => {
    const videoUrl = document.getElementById('videoUrl').value;
    fetch('http://localhost:3000/api/thumbnail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(thumbnails => {
        const thumbnailsDiv = document.getElementById('thumbnails');
        thumbnailsDiv.innerHTML = ''; // Clear previous thumbnails

        // Create an array of resolutions to iterate over
        const resolutions = [
            { label: 'Low', key: 'low' },
            { label: 'Medium', key: 'medium' },
            { label: 'High', key: 'high' },
            { label: 'Max', key: 'max' }
        ];

        // Generate thumbnail images with labels
        resolutions.forEach(res => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'thumbnail-container';

            const img = document.createElement('img');
            img.src = thumbnails[res.key];
            img.alt = `${res.label} thumbnail`;
            
            const label = document.createElement('span');
            label.textContent = res.label;
            
            const a = document.createElement('a');
            a.href = thumbnails[res.key];
            a.download = `${res.label}_thumbnail.jpg`;
            a.appendChild(img);

            imgContainer.appendChild(a);
            imgContainer.appendChild(label);
            thumbnailsDiv.appendChild(imgContainer);
        });
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});
