const mongoose = require('mongoose')

const connectDB = () => {
    try {

        mongoose.connect("mongodb://127.0.0.1:27017/employees?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6")
        mongoose.connection.on('error', () => console.error('Connection to MongoDB Failed'))

        mongoose.connection.once('open', () => console.log('Connected To MongoDB'))

    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB