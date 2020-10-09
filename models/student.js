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

studentSchema.pre('remove',function(next){
    Company.find({student: this.id},(err, companies)=>{
        if(err){
            next(err)
        } else if (companies.lenght > 0){
            next(new Error('This student dont have company'))
        } else {
            next()
        }
    })
})

 module.exports = mongoose.model('Student',studentSchema)