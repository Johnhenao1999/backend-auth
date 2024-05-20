import mongoose from "mongoose";

const salchipapaSchema = new mongoose.Schema({
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
    price: {
        type: String
    }
},
{
    timestamps: true
});

export default mongoose.model('Salchipapas', salchipapaSchema);
