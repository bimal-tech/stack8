const multer = require("multer");


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = "uploads/";
        cb(null, path)
    },
    filename: (req, file, cb) =>{
        // a.png => a.png
        let filename = Date.now()+file.originalname;
        cb(null, filename);
    }
})

const uploader = multer({
    storage: myStorage,
    // limits: 5*1024*1024,
    fileFilter: (req, file, cb) => {
        let ext_parts = file.originalname.split(".");        
        let ext = ext_parts.pop();
        // console.log(file);
        try{
            let allowed = ['jpg', 'jpeg', 'png','gif','bmp','webp','svg'];
            if(allowed.includes(ext.toLowerCase())){
                cb(null, true);
            } else {
                cb(null, false);
            }
        } catch(error) {
            console.log("Error: ", error);
        }
    }
});


module.exports = uploader;