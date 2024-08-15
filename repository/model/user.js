import UserModel from '../mongo/model/user.js';

const user = {
    getUserByLogin: async (login) => {
        const user = await UserModel.findOne({login: login})
        user.password = undefined
        return user
    },
    getUserByLoginWithPassword: async (login) => {
        return await UserModel.findOne({login: login})
    },
    getUserByNick: async (nick) => {
        const user = await UserModel.findOne({nick: nick})
        if (!user) return null
        user.password = undefined
        user.login = undefined
        return user
    },
    setUserRaceTimer: async (login, minutes) => {
        const res = await UserModel.updateOne({login: login}, {$set: {'timers.race': Math.floor(Date.now() / 1000) + 60*minutes}})
    },
    setUserWorkTimer: async (login, minutes) => {
        const res = await UserModel.updateOne({login: login}, {$set: {'timers.work': Math.floor(Date.now() / 1000) + 60*minutes}})
    },
    setUserTreningTimer: async (login, minutes) => {
        const res = await UserModel.updateOne({login: login}, {$set: {'timers.trening': Math.floor(Date.now() / 1000) + 60*minutes}})
    },
    addItem: async (login, name) => {
        console.log(name)
        const res = await UserModel.updateOne(
            { login: login }, 
            { $push: { items: name } },
        );
        console.log(res)
    }
}

export default user