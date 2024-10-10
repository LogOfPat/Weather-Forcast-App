const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8005;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(__dirname + '/public'));

// Send user to homepage

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`))