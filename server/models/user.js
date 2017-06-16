var mongoose = require('mongoose')
var Schema = monggose.schema


var userSchema = new Schema({
    name:String,
    username:String,
    password:String,
    email:String
})
