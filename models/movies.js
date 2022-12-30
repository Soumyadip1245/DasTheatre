const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moviesSchema = new Schema({
    name: {type: String},
    image: {type: String},
    age: {type: String},
    release: {type: String},
    type: {type: String},
    amount: {type: String},
    description: {type: String},
    buyout: {type:Boolean, default: false},
    checkout: {type:Boolean, default: false}
})
module.exports = mongoose.model('Movies',moviesSchema)