import mongoose from "mongoose";
const schema = new mongoose.Schema({
    links: {
        background: String,
    }, 
});

const ImagesModel = mongoose.model('Images', schema);

export default ImagesModel;