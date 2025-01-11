const mongoose = require('mongoose')

const childrenSchema = new mongoose.Schema({
    name: { type: String, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'parents' },
    verified: { type: Boolean, default: false },
    image: { type: String, required: false },
    note: { type: String, required: false}
 })


const Children = mongoose.model('children', childrenSchema)

module.exports = Children