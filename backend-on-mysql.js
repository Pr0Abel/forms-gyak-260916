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
    const sql = 'SELECT id, name, email FROM users'
    conn.query(sql, (error, results, fields) => {
        if (error) {
            console.warn("GET/users error:", +error.message)
            return res.status(500).json({ error })
        } else {
            return res.status(200).json({ results, fields })
        }
    })
})

//GET /users/:id
app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT id, name, email FROM users WHERE id = ?'
    conn.query(sql, [+id], (error, results, fields) => {
        if (error) {
            console.warn(`GET/users/${id} error:`, +error.message)
            return res.status(500).json({ error })
        } else {
            return res.status(200).json({ results, fields })
        }
    })
})

//POST /users
    app.post('/users', (req, res) => {
        const {name, email, password} = req.body
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
        conn.query(sql, [name, email, password], (error, results, fields) => {
            if (error) {
                console.warn("POST/users error:", +error.message)
                return res.status(500).json({error})
            } else {
                return res.status(201).json({results})
            }
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT)
})