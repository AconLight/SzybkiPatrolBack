import mongoose from "mongoose";
const schema = new mongoose.Schema({
    login: String, 
    password: String, 
    nick: String, 
    lvl: Number, 
    timers: {work: Number, trening: Number, race: Number},
    mainStats: {
        speed: Number,
        attack: Number, 
        armor: Number, 
        steering: Number},
    stats: {
        money: Number,
        rt: Number
    },
    items: [{itemId: mongoose.ObjectId, isEquiped: Boolean}]
});

const UserModel = mongoose.model('User', schema);

export default UserModel;