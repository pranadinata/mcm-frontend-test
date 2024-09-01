const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors()); // Mengizinkan semua domain
// Atau, mengizinkan hanya domain tertentu
// app.use(cors({ origin: 'https://yourdomain.com' }));

app.get('/api/data', async (req, res) => {
    try {
        // Melakukan permintaan GET ke API eksternal
        //   const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const response = await axios.get('https://www.mmobomb.com/api1/games?platform=pc');



        // Mengembalikan data yang diterima dari API ke klien
        res.status(200).json(response.data);
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        res.status(500).json({
            message: 'Error fetching data',
            error: error.message
        });
    }
});

app.get('/api/data/:id', async (req, res) => {
    try {
        // Melakukan permintaan GET ke API eksternal
        //   const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const response = await axios.get('https://www.mmobomb.com/api1/game?id='+req.params.id);


        // res.json(req.params.id);
        // Mengembalikan data yang diterima dari API ke klien
        res.status(200).json(response.data);
    } catch (error) {
        // Menangani kesalahan jika permintaan gagal
        res.status(500).json({
            message: 'Error fetching data',
            error: error.message
        });
    }
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});