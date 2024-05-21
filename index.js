import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import management from './src/routes/management.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http'; // Importar http para crear un servidor
import { Server } from 'socket.io'; // Importar Server de socket.io

// Configurar dotenv para cargar las variables de entorno
dotenv.config();

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la aplicación Express
const app = express();

// Configurar CORS
app.use(cors({
    origin: ["http://localhost:5173", "https://frontend-auth-six.vercel.app", "https://admin-food-jah.vercel.app"],
    credentials: true,
}));

// Middleware para analizar JSON
app.use(express.json()); 

// Middleware para analizar cookies
app.use(cookieParser());

// Middleware para servir archivos estáticos desde 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de autenticación y tareas
app.use("/api/v1", authRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1/management", management);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
});

// Configuración de socket.io
const server = http.createServer(app); // Usar la instancia de http.Server con Express
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://frontend-auth-six.vercel.app", "https://admin-food-jah.vercel.app"],
        credentials: true
    }
});

// Escuchar eventos de conexión de socket.io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Hacer que io esté disponible globalmente para los controladores
app.set('socketio', io);

// Función para conectar a la base de datos
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado correctamente a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Termina el proceso si no puede conectar a la base de datos
    }
};

// Iniciar la aplicación
const startServer = async () => {
    await connectDb();
    server.listen(3000, () => {
        console.log("Server on port 3000");
    });
};

startServer();
