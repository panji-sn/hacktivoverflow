const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema ({
    tag: {
        type: String
    }
})

const Tag = mongoose.model('Tags', TagSchema)

module.exports = Tag