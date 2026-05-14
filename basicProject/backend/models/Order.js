import { Schema, model, Types } from 'mongoose'

const orderItemSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtOrder: { type: Number, required: true },
  },
  { _id: false }
)

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'user', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default model('order', orderSchema)
