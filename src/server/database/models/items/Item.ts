import { Schema, Types, model } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Item = model("Item", itemSchema, "items");

export default Item;
