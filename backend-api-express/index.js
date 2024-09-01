const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());


app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://www.mmobomb.com/api1/games?platform=pc');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data',
            error: error.message
        });
    }
});

app.get('/api/data/:id', async (req, res) => {
    try {
        const response = await axios.get('https://www.mmobomb.com/api1/game?id='+req.params.id);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data',
            error: error.message
        });
    }
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});