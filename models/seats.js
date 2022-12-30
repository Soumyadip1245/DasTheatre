const mongoose = require('mongoose')
const Schema = mongoose.Schema
const seatSchema = new Schema({
    Seat: {type: String},
    type: {type: String},
    price: {type: String},
    available: {type:Boolean, default: false}
})
module.exports = mongoose.model('Seats',seatSchema)