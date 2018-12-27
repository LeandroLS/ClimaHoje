const path = require('path');
const viewsPath = path.normalize(__dirname + '/../source/views/');
const imagesPath = path.normalize(__dirname + '/../source/public/images');

module.exports = {
    path : path,
    viewsPath : viewsPath,
    imagesPath : imagesPath
}