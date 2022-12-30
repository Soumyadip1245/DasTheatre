const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookSchema = new Schema({
    name: {type: String},
    movie: {type: String},
    contact: {type: String},
    email:  {type: String},
    payment: {type: String},
    seat: {type: Array},
    total: {type: String},
    date: {type: Number, default:Date.now().valueOf()},
    order: {type: String}
})
module.exports = mongoose.model('Booking',bookSchema)