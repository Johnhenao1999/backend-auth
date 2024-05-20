import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const task = await Task.find({ user: req.user.id }).populate('user')
    res.json(task)
}

export const getTasksAll = async (req, res) => {
    const task = await Task.find().populate('user')
    res.json(task)
}

/* export const createTask = async (req, res) => {
    const { title, description, date } = req.body
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    })
    await newTask.save()
    res.json(newTask)

} */

export const createTask = async (req, res) => {
    try {
        const tasksData = req.body; // Array de objetos
        const createdTasks = [];

        for (const taskData of tasksData) {
            const { name, description, price, sauces, quantity, status, date } = taskData;
            const newTask = new Task({
                name, 
                description,
                price,
                sauces,
                quantity,
                date,
                status,
                user: req.user.id
            });
            await newTask.save();
            createdTasks.push(newTask);
        }

        res.status(201).json(createdTasks); // Respondemos con estado 201 (Created) y enviamos las tareas creadas
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejamos cualquier error interno del servidor y respondemos con un estado 500 (Internal Server Error)
    }
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




export const getTask = async (req, res) => {
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
}
