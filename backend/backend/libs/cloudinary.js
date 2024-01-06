// import {v2 as cloudinary} from "cloudinary";

const {v2} = require('cloudinary');

v2.config({
    cloud_name: "dibfsgzf9",
    api_key: "733613588329532",
    api_secret: "fKAe_3-pFz9l_8lENNMfQyTrLXg",
})

const uploadImage = async filePath =>{
    return await v2.uploader.upload(filePath, {
        folder: 'posts'
    })
}

module.exports = uploadImage;
