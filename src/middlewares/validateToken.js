import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    const cookieHeader = req.headers.cookie;
    const cookiePairs = cookieHeader.split(';').map(pair => pair.trim());
    let token;

    for (const pair of cookiePairs) {
        if (pair.startsWith('token=')) {
            token = pair.substring('token='.length);
            break;
        }
    }

    if (!token) {
        return res.status(401).json({ message: "No se encontró el token, autorización denegada" });
    }

    jwt.verify(token, TOKEN_SECRET, (err,user) =>{
        if(err) return res.status(403).json({message: "Invalid token"})
        req.user = user;
        next();
    })
}