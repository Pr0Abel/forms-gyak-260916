const express = require('express')
const mysql = require('mysql2')
const app = express()

app.use(express.json())

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'users'
})

conn.connect(err => {
    if (err) {
        console.warn('Error connecting to MySQL:', err.message)
    } else {
        console.log('Connected to MySQL database.')
    }
})

//GET
app.get('/users', (req, res) => {
  const data = {}
    return res.status(200).json(data)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT)
})