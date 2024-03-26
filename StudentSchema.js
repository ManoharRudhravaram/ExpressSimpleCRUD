import mongoose from "mongoose";

let studentModal=new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    }
},{timestamps:true})

export default mongoose.model('studentsData',studentModal);