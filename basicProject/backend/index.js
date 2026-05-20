import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDB } from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT

await connectToDB()

app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)
app.use('/wishlist', wishlistRoutes)
app.use('/order', orderRoutes)
app.use('/upload', uploadRoutes)

app.listen(PORT, () => console.log('Server started at port ' + PORT))
