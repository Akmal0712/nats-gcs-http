import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const OrderModel = mongoose.model("Order", orderSchema, "orders");
export default OrderModel;
