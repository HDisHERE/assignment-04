import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

// SQLite initialize. This part I use copilot to create. 
const __dirname = path.dirname(fileURLToPath(import.meta.url))

let _db
function getDB() {
  if (!_db) {
    _db = new Database(path.join(__dirname, 'users.db'))
    _db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        email         TEXT    NOT NULL UNIQUE,
        password_hash TEXT    NOT NULL,
        created_at    TEXT    DEFAULT (datetime('now'))
      )
    `)
    _db.exec(`
      CREATE TABLE IF NOT EXISTS feedback (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        issue      TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `)
  }
  return _db
}

// ── Express API
const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Sign up
app.post('/api/register', (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' })
  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })

  const db = getDB()
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing)
    return res.status(409).json({ error: 'This email is already registered.' })

  const hash = bcrypt.hashSync(password, 10)
  db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash)
  res.status(201).json({ message: 'Account created successfully!' })
})

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' })

  const db = getDB()
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user || !bcrypt.compareSync(password, user.password_hash))
    return res.status(401).json({ error: 'Invalid email or password.' })

  res.json({ message: `Welcome back, ${email}!` })
})

// Submit feedback
app.post('/api/feedback', (req, res) => {
  const { name, email, issue } = req.body
  if (!name || !email || !issue)
    return res.status(400).json({ error: 'All fields are required.' })

  const db = getDB()
  db.prepare('INSERT INTO feedback (name, email, issue) VALUES (?, ?, ?)').run(name, email, issue)
  res.status(201).json({ message: `Thank you, ${name}! Your feedback has been received.` })
})

app.listen(3000, () => console.log('API server → http://localhost:3000'))