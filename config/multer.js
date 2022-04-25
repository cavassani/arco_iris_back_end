import * as path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
         cb(null, path.join("./public/images/"));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Não é uma imagem, por favor suba apenas imagens.', 400), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});

export default upload