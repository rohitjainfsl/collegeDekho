import { Schema, model, Types } from 'mongoose'

const wishlistSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'user', required: true, unique: true },
    products: [{ type: Types.ObjectId, ref: 'product' }],
  },
  { timestamps: true }
)

export default model('wishlist', wishlistSchema)
