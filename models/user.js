const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {type: String},
    phone: {type: String},
    email: {type: String},
    password: {type: String},
    authorised: {type:Boolean, default: false},
    type: {type: String}
})
module.exports = mongoose.model('User',userSchema)