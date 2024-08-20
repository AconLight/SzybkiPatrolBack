import ItemModel from '../mongo/model/item.js';

const item = {
    getAllItems: async () => {
        return await ItemModel.find()
    },
    getItemByName: async (name) => {
        return await ItemModel.findOne({name: name})
    },
    getItemById: async (id) => {
        return await ItemModel.findById(id)
    },
    getItemsByIds: async (ids) => {
        return await ItemModel.find({_id: {"$in": ids}})
    },
    getItemByCategory: async (category) => {
        return await ItemModel.find({category: category})
    }
}

export default item