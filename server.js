require('dotenv').config()

const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT;

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(con => {
    console.log("Koneksi ke database sukses!")
});

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
});