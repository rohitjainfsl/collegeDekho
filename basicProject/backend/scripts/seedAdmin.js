import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectToDB } from '../config/db.js'
import User from '../models/User.js'

await connectToDB()

const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME) {
  console.error('Missing ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_NAME in .env')
  process.exit(1)
}

const existing = await User.findOne({ email: ADMIN_EMAIL })
if (existing) {
  console.log(`Admin already exists: ${ADMIN_EMAIL}`)
  process.exit(0)
}

const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12)
await User.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: hashed, role: 'admin' })
console.log(`Admin created: ${ADMIN_EMAIL}`)
process.exit(0)
