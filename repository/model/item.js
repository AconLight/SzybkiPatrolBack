import ItemModel from '../mongo/model/item.js';

const item = {
    getAllItems: async () => {
        return await ItemModel.find()
    },
    getItemByName: async (name) => {
        return await ItemModel.findOne({Nazwa: name})
    },
    getItemsByNames: async (names) => {
        return await ItemModel.find({Nazwa: {"$in": names}})
    },
    getItemByCategory: async (category) => {
        return await ItemModel.find({category: category})
    }
}

export default item