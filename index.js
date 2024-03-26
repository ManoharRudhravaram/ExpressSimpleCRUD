const express=require('express')
const multer=require('multer')
const sharp=require('sharp')
const path=require('path')
const fs=require('fs')

let app = express()

// 1) Problem 
//sample aray of users 
let users = [{ id: 1, name: "Manohar" }, { id: 2, name: "Aravind" }, { id: 3, name: "Apoorv" }]
app.use(express.json())
//get 
app.get('/api/users', (req, res) => {
    res.json(users)
})

//post
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser)
})

app.delete('/api/users/:id', (req, res) => {
    const userId = parse(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId)
    if (userIndex === -1) {
        return res.status(404).json({ message: "user not found" })
    }
    const deletedUser = users.splice(userIndex, 1)
    res.json(deletedUser[0])
})


// 2)Problem
const upload=multer({
    dest:'uploads/'
})

app.post('/api/upload',upload.single('image'),async(req,res)=>{
    if(!req.file){
        return res.status(400).json({error:"no file uploaded"})
    }
    try{
        const image=req.file;
        const filename=image.filename;
        const outputpath=path.join(__dirname,'thumbnails',`${filename}-thumbnail.jpg`)
        await sharp(image.path).resize({width:200,height:200}).toFile(outputpath);
        res.json({message:"image uploaded",filename})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'something wrong'})
    }
})

app.get('/thumbnail/:filename',(req,res)=>{
    const {filename}=req.params;
    const thumbnailPath=path.join(__dirname,'thumbnails',`${filename}-thumbnail.jpg`)
    if(fs.existsSync(thumbnailPath)){
        res.sendFile(thumbnailPath)
    }
    else{
        res.status(404).json({error:"thumbnail not found"})
    }
})

app.listen(8080, () => {
    console.log('server started');
})