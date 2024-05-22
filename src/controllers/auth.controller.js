import User from '../models/user.model.js'
import { createAccessToken } from '../libs/jwt.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email is already in use"]);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json(["Incorrect password"]);

        const token = await createAccessToken({ id: userFound._id });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "User not found" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })
}

export const verifyToken = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No se encontró el token de autorización, autorización denegada" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

        try {
            const userFound = await User.findById(decodedToken.id);
            if (!userFound) {
                return res.status(401).json({ message: "Usuario no encontrado" });
            }

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            });
        } catch (error) {
            console.error("Error al buscar el usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    });
};