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
    buyItem: async (login, id, price) => {
        const res = await UserModel.updateOne(
            { login: login }, 
            { $push: { items: {
                itemId: id,
                isEquiped: false
            } }, $inc: { 'stats.money': -1*price } },
        );
    },
    activateItem: async (login, itemId) => {
        const res = await UserModel.updateOne(
            { login: login, items: { "$elemMatch": {itemId: itemId}} }, 
            { $set: { 'items.$.isEquiped': true }}
        );
    },
    deactivateItems: async (login, itemIds) => {
        const res = await UserModel.updateMany(
            { login: login, 'items': { "$elemMatch": { itemId: {'$in': itemIds}}} }, 
            { $set: { 'items.$[x].isEquiped': false }},
            { arrayFilters: [{'x.itemId': {'$in': itemIds}}] },
        );
        console.log(res)
    },
    incStat: async (login, statName, price) => {
        const res = await UserModel.updateOne(
            { login: login }, 
            { $inc: { 'stats.money': -1*price, [`mainStats.${statName}`]: 1} },
        );
        console.log(res)
    }
}

export default user