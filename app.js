const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const userRouter = require('./routes/user/userRouter')
const studentRouter = require('./routes/student/studentRouter')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    res.send("Welcome my server")
})


app.use('/api/user', userRouter)
app.use('/api/student', studentRouter)

module.exports = app