const mongoose = require('mongoose')
const Schema = mongoose.Schema
const notificatioSchema = new Schema({
    message: {type: String, required: true},
    type: {type:String, required: true}
})
module.exports = mongoose.model('Notification',notificatioSchema)