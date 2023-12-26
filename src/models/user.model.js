const mongoose = require('mongoose')

const User = new mongoose.model("User", mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: String, required: true }
}))

module.exports = User
