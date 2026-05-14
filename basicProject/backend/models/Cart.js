import { Schema, model, Types } from 'mongoose'

const cartItemSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
)

const cartSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'user', required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
)

export default model('cart', cartSchema)
