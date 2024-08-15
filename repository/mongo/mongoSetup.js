import { UserModel } from "./model/user.js";
import { getMongo, mongoConnect, mongoDisconnect } from "./mongo.js"

const models = [
    UserModel
]

const dropDB = async () => {
    for await (const model of models) {
        const result = await model.collection.drop()
    }
}

const createDB = async () => {
    const result = await UserModel.create({ nick: 'Patrol', lvl: 1 }) 
}

const mongoSetup = async () => {
    await mongoConnect();
    const mongoDB = await getMongo();
    await dropDB()
    await createDB()
    await mongoDisconnect()
}

export default mongoSetup