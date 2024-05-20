import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads')); // Corregir la ruta del directorio uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Filtrar el tipo de archivos
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;
