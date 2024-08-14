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
    }
}

export default user