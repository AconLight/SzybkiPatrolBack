import mongoose from 'mongoose';
import 'dotenv/config'

const mongoString = process.env.DATABASE_URL

export const mongoConnect = () => {
    mongoose.connect(mongoString);
}

export const mongoDisconnect = () => {
    mongoose.connection.close();
}

export const getMongo = () => {
    return mongoose.connection
}