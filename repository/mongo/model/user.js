import mongoose from "mongoose";
const schema = new mongoose.Schema({ nick: String, lvl: Number });

const UserModel = mongoose.model('User', schema);

export default UserModel;