const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuestionSchema = new Schema ({
    title: {
        type: String,
        required: [true, "Title can't be empty"]
    },
    description: {
        type: String,
        required: [true, "Content can't be empty"]
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    upVotes: {
        type: Array
    },
    tags: {
        type: Array
    },
    downVotes: {
        type: Array
    },
    answer: {
        type: Array
    }
}, {
    versionKey: false
})


const Question = mongoose.model("Questions", QuestionSchema)

module.exports = Question