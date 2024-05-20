import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/task.routes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Rutas de autenticación y tareas
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

// Middleware para servir archivos estáticos desde 'uploads'
app.use('/uploads', express.static('./uploads'));

// Middleware para analizar cookies
app.use(cookieParser());

export default app;
