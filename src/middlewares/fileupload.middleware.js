// import multer
import multer from "multer";

// configure storage with filename and location

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        if (file) {
            const name = Date.now() + '-' + file.originalname;
            cb(null, name);
        } else {
            cb(new Error('File Object is undefined'), null);
        }
    },
});

export const upload = multer({storage: storage});