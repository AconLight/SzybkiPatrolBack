import mongoose from "mongoose";
const schema = new mongoose.Schema({ name: String, category: String });

const ItemModel = mongoose.model('Item', schema);

export default ItemModel;