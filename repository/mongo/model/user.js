import mongoose from "mongoose";
const schema = new mongoose.Schema({ login: String, password: String, nick: String, lvl: Number, speed: Number, atack: Number, armor: Number, steering: Number });

const UserModel = mongoose.model('User', schema);

export default UserModel;