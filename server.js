// Dependencies
const express = require('express')
//Configuration
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

//Middleware
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))

//Routes
app.get('/', function(req, res){
    res.send('Welcome to an Awesome App about Breads!')
})

//breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


//Listen
app.listen(PORT, function(){
    console.log('Listening on port', PORT)
})

