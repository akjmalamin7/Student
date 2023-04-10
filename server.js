const dotenv = require('dotenv')
dotenv.config()

const app = require('./app')
const mongoose = require('mongoose')

const SERVER = process.env.MONGODB_SERVER
const PORT = process.env.PORT || 3009

mongoose.connect(SERVER)
.then(()=>console.log("MongoDB Connected!"))
.catch(err=>console.error('MongoDB Connection failed!'))

app.listen(PORT, ()=>{
    console.log(`The Server is running on port:http://localhost:${PORT}`);
})