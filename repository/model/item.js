import ItemModel from '../mongo/model/item.js';

const item = {
    getAllItems: async () => {
        return await ItemModel.find()
    },
    getItemByName: async (name) => {
        return await ItemModel.findOne({name: name})
    },
    getItemByCategory: async (category) => {
        return await ItemModel.find({category: category})
    }
}

export default item