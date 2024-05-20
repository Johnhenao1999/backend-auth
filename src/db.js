import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno
dotenv.config();

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL);
        console.log('Conectado correctamente a la base de datos Atlas');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Termina el proceso si no puede conectar a la base de datos
    }
};
