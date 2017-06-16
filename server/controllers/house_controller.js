var Home = require('../models/house')
const methods = {}

methods.getAll = function(req, res){
  Home.find({}, function(error, records){
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.createHouse = function(req, res){

  let new_house = {
    title : req.body.title,
    price : req.body.price,
    location : req.body.location,
    lat : req.body.coor.lat,
    lng: req.body.coor.lng,
    spec : req.body.spesifikasi,
    created_at : new Date()
  }

  Home.create(new_house, function(error, records){
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.getByid = function(req, res){
  Home.findById(req.params.id, function(error, records){
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}


methods.updateById = function(req, res){
  Home.findByIdAndUpdate(req.params.id, { $set:req.body }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Home.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods
