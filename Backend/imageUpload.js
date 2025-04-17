const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');  // Import multer for file handling
const crypto = require('crypto');
const { mongoURI } = require('./config');
const path = require('path');

// GridFS storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'productImages' // bucket name in MongoDB
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });
module.exports = upload;