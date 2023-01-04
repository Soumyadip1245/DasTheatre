const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moviesSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    age: {type: String, required: true},
    release: {type: String, required: true},
    type: {type: String, required: true},
    amount: {type: String, required: true},
    description: {type: String, required: true},
    buyout: {type:Boolean, default: false},
    checkout: {type:Boolean, default: false}
})
module.exports = mongoose.model('Movies',moviesSchema)