import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
        }
        else {
            return res.status(401).json({message: "Unauthorized"})
        }

        const token = req.headers.authorization.split(' ')[1]
    
        let decodedData;


        if(token){
            decodedData = jwt.verify(token, 'test')
            req.userid = decodedData.userid
            req.username = decodedData.username
        }

        next()

    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}

export default auth