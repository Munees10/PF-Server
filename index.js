//loads .en file contents into process .env by default.
require('dotenv').config('express')
const express = require('express')
const cors = require('cors')
const router = require('./Router/router')
require('./DB/connection')
//creates an application
const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PORT = 4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project Fair server started at port: ${PORT} and waiting for client request!!!`);
})
//http get request resolivng to http://localhost:4000/
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Fair server started waiting for client request!!!</h1>`)
})

// pfServer.post('/',(req,res)=>{
//     res.send(`post request`)
// })

// pfServer.put('/',(req,res)=>{
//     res.send(`PUT request`)
// })