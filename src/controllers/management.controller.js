import Task from '../models/task.model.js'
import Salchipapas from '../models/salchipapas.model.js'

export const getSalchi = async (req, res) => {
    const salchi = await Salchipapas.find()
    res.json(salchi)
}

export const createSalchi = async (req, res) => {
    try {
        const salchisData = req.body; // Array de objetos
        const createdSalchi = [];

        for (const salchiData of salchisData) {
            const { name, description, price, date } = salchiData;
            const newSalchi = new Salchipapas({
                name, 
                description,
                price,
                date,
            });
            await newSalchi.save();
            createdSalchi.push(newSalchi);
        }

        res.status(201).json(createdSalchi); // Respondemos con estado 201 (Created) y enviamos las tareas creadas
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejamos cualquier error interno del servidor y respondemos con un estado 500 (Internal Server Error)
    }
}

export const getPedidosAll = async (req, res) => {
    const task = await Task.find().populate('user')
    res.json(task)
}

export const updateStatus = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!task) {
        return res.status(404).json({ message: "Task not found" })
    }
    res.json(task)
}





/* export const createTask = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { title, description, date } = req.body;
        const filePath = req.file ? `/uploads/${req.file.filename}` : null;
        console.log

        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id,
            filePath: filePath
        });

        try {
            await newTask.save();
            res.json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}; */




/* export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        return res.status(404).json({ message: "Task not found" })
    }
    res.json(task)

}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
        return res.status(404).json({ message: "Task not found" })
    }
    return res.sendStatus(204);

}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!task) {
        return res.status(404).json({ message: "Task not found" })
    }
    res.json(task)
} */
