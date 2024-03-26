import express from 'express';
import DbConnect from './Db.js';
import StudentSchema from './StudentSchema.js';
import morgan from 'morgan';

let app = express()

app.use(express.json());
app.use(morgan('dev'));
DbConnect()
app.get('/', (req, res) => {
    res.send('working')
})

app.post('/studentReg', async (req, res) => {
    try {
        let { id, name } = req.body;
        if (!id || !name) {
            return res.send({ message: "all fields required" })
        }
        let existingStudent = await StudentSchema.findOne({ id })
        if (existingStudent) {
            return res.send({ message: "already id exists" })
        }
        let result = await StudentSchema({ id, name }).save()
        res.send({ message: "successfully created ", result })
    } catch (error) {
        res.send({ message: "error in reg" })
    }
})

app.get('/students', async (req, res) => {
    try {
        let result = await StudentSchema.find();
        res.send({ message: "all students", result, total: result.length })
    } catch (error) {
        console.log(error);
        res.send({ message: "error" })
    }
})

app.put('/studentUpdate/:id', async (req, res) => {
    try {
        let { name } = req.body;
        let { id } = req.params;
        if (!id || !name) {
            return res.send({ message: "all fields required" })
        }
        let existingStudent = await StudentSchema.findOne({ _id: id })
        if (!existingStudent) {
            return res.send({ message: "student not registered" })
        }
        let updatedStudent = await StudentSchema.findByIdAndUpdate({ _id: id }, { name: name }, { new: true });
        res.send({ message: "updated successfully", updatedStudent })
    } catch (error) {
        console.log(error);
        res.send({ message: "error" })
    }
})

app.delete('/studentDelete/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let existingStudent = await StudentSchema.findOne({ _id: id })
        if (!existingStudent) {
            return res.send({ message: "student not registered" })
        }
        await StudentSchema.findByIdAndDelete({ _id: id });
        res.send({ message: "deleted successfully" })
    } catch (error) {
        console.log(error);
        res.send({ messsage: "error" })
    }
})

app.listen(8080, () => {
    console.log('server started');
})