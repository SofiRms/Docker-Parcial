const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mariadb = require('mariadb');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT 
const app = express()

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

// Endpoint de verificación 
app.get('/check-mariadb-connection', async (req, res) => {
    try {
      const connection = await mariadb.createConnection({
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
      //  database: process.env.MARIADB_DATABASE,
      });
      await connection.end();
      res.json({ message: 'La conexión a MariaDB se realizó exitosamente.' });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  
  app.get('/check-mongodb-connection', async (req, res) => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      res.json({ message: 'La conexión a MongoDB se realizó exitosamente.' });
    } catch (error) {
      res.json({ error: error.message });
    }
  });


app.listen(PORT, () => 
    console.log(`listen on port ${PORT}`
))

