const mongoose = require('mongoose')
 
const companySchema = new mongoose.Schema({
    company_name:{
        type: String,
        required: true
    }
    ,
    company_address:{
        type: String,
        required: true
    },
    course:{
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('Company', companySchema)