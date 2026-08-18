const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const employeeRoutes = require('./Routes/employeeRoutes')
const userRouter = require('./Routes/userRoutes')

const app = express()
app.use(express.json())
app.use(cors())


app.use('/api/employees', employeeRoutes)
app.use('/api/users', userRouter)

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || ' mongodb+srv://hussaingoraya982_db_user:BUiH1PPxl63OHupN@cluster0.oip7vdd.mongodb.net/'

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log('DB Connection Error:', err));