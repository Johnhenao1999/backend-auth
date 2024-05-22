import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No se encontró el token de autorización, autorización denegada" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user;
        next();
    });
};