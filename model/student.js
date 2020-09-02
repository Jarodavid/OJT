const { removeAllListeners } = require("nodemon");

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    studentId:{
        type: String,
        required:true
    },
    studentTime:{
        type: Date,
        required:true,
        default:Date.now
    }
})

module.exports = mongoose.model('Student',studentSchema)