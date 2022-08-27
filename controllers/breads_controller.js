const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')


// Index:
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
      .then(foundBreads => {
          res.render('Index', {
              breads: foundBreads,
              bakers: foundBakers,
              title: 'Index Page'
          })
      })
    })
})




//NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})


//Show
breads.get('/:arrayIndex', (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .populate('baker')
        .then(foundBread => {
          const bakedBy = foundBread.getBakedBy()
          console.log(bakedBy)
            res.render('show', {
                bread: foundBread
            })
        })
})


//Create
breads.post('/', (req, res) => {
    if(!req.body.image) {
        req.body.image = undefined 
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })
  
// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.indexArray)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})



  //Update
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.arrayIndex}`) 
    })
})


//Delete
breads.delete('/:arrayIndex', (req, res) => {
  Bread.findByIdAndDelete(req.params.arrayIndex) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


module.exports = breads