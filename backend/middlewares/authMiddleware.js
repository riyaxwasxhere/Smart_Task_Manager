import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken || !decodedToken.userId){
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userId = decodedToken.userId;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

export default authMiddleware;