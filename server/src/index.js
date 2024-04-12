require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
require('./DB/connection')
const morgon = require("morgan")
const userRouter = require('./router/userRouter')
const doctorRouter = require('./router/doctorRouter')
var cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(morgon("dev"))
app.use('/api/userRouter',userRouter)
app.use('/api/doctorRouter',doctorRouter)




app.listen(PORT, ()=>{
console.log(`app listen on port no ${PORT}`);
});
