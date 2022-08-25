// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose');



//Configuration
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)


//Middleware
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

//Routes
app.get('/', function(req, res){
    res.send('Welcome to an Awesome App about Breads!')
})

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})



//Listen
app.listen(PORT, function(){
    console.log('Listening on port', PORT)
})

