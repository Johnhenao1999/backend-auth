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

// Configurar dotenv para cargar las variables de entorno
dotenv.config();
 
// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la aplicación Express
const app = express();

// Configurar CORS
app.use(cors({
    origin: "http://localhost:5173",
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
app.use("/api/v1", management);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
  });
  

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
    app.listen(3000, () => {
        console.log("Server on port 3000");
    });
};

startServer();
