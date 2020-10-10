 const mongoose = require('mongoose')
 const Company = require('./company')
 
 const studentSchema = new mongoose.Schema({
     name:{
         type: String,
         required: true
     }
     ,
     studentId:{
         type: Number,
         required: true
     },
     course:{
        type: String,
        required: true
    }
 })


 module.exports = mongoose.model('Student',studentSchema)