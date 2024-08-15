import mongoose from "mongoose";
const schema = new mongoose.Schema({
    login: String, 
    password: String, 
    nick: String, 
    lvl: Number, 
    timers: {work: Number, trening: Number, race: Number},
    mainStats: {
        speed: Number,
        atack: Number, 
        armor: Number, 
        steering: Number},
    stats: {
        money: String,
        cans: String
    },
    items: [String]
});

const UserModel = mongoose.model('User', schema);

export default UserModel;