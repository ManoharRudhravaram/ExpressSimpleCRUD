// import mongoose  from "mongoose";

// let dbConnect=async()=>{
//     try {
//         await mongoose.connect('mongodb://localhost:27017/students');
//     } catch (error) {
//         console.log('error in db connection');
//     }
// }

// export default dbConnect

import mongoose from 'mongoose';

//db connection
let DbConnect=async()=>{
    try{
        let connection=await mongoose.connect('mongodb://127.0.0.1:27017/STUDENT')
        console.log("connection done");
    }
    catch(err){
        console.log(err);
    }
}

export default DbConnect;