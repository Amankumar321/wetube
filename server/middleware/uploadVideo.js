import multer from 'multer'
import path from 'path'
 

export const uploadVideoMiddleware = async (req, res, next) => {
    try {
        const folder = 'videos'

        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './public/' + folder)
            },
            filename: function (req, file, callback) {
                callback(null, Date.now() + '.' + file.mimetype.split('/')[1])
            }
        })

        const fileFilter = (res, file, callback) => {
            if (file.mimetype.split('/')[0] === 'video') {
                callback(null, true)
            }
            else {
                callback(null, false)
            }
        }

        let upload = multer({storage: storage, limits: {
            fileSize: 1024 * 1024 * 50},
            fileFilter: fileFilter}).single('file')
        
        upload(req, res, function () {
            next()
        })

    } catch (error) {
        return res.status(500).json({message: "Something went wrong"})
    }
}
