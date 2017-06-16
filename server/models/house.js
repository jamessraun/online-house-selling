var mongoose = require('mongoose')
var Schema = mongoose.Schema

var houseSchema = new Schema({
    title : String,
    price : Number,
    location : String,
    lat :String,
    lng:String,
    spec : String,
    created_at : Date
})

var House = mongoose.model('House',houseSchema)

module.exports = House;
