const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images')
    },
    filename: (req, file, cb)=> {
        const timestamp = new Date().getTime();
        const originalname = file.originalname;

        cb(null, `${timestamp}-${originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
            req.fileValidateionError = 'Hanya file foto yang diizinkan';
            return cb(new Error('Hanya file foto yang Diizinkan!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 10 * 1000 * 1000 //3MB
    },
});

module.exports = upload;