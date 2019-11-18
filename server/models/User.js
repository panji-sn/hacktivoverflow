const mongoose = require("mongoose")
const { hashPassword } = require("../helpers/bcrypt")
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    email: {
        type: String,
        unique: [true, "Email already registered"],
        required: [true, "Email can't be empty"]
    },
    password: {
        type: String,
        minlength: [5, "Minimum password is 5 characters length"],
        required: [true, "Password can't be empty"]
    },
    name: {
        type: String,
        required: [true, "Name can't be empty"]
    },
    tags: {
        type: Array
    }
}, {
    versionKey: false
})

UserSchema.pre("save", function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model("Users", UserSchema)

module.exports = User