import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: String
    },
    sauces: {
        type: [String], // Array de strings para las salsas
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
},
{
    timestamps: true
});

export default mongoose.model('Task', taskSchema);
