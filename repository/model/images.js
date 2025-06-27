import ImagesModel from '../mongo/model/images.js';

const images = {
    getLinks: async () => {
        let images = await ImagesModel.findOne({})
        images = images.toObject()
        return images.links
    },
}

export default images