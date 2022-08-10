// Dependencies
const express = require('express')
//Configuration
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

//Routes
app.get('/', function(req, res){
    res.send('Welcome to an Awesome App about Breads!')
})

//breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

//Listen
app.listen(PORT, function(){
    console.log('Listening on port', PORT)
})

