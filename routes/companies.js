const express = require('express')
const router = express.Router()
const Company = require('../models/company')
// const axios = require('axios').default;
// const url = ('http://names.drycodes.com/10?nameOptions=boy_names')


// axios.get(url).then(response => {

// }).catch(err => {

// })
//All Company Route
router.get('/', async (req,res) => {
    let searchOptions ={}
    if(req.query.course != null && req. query.course !== ''){
        searchOptions.course = new RegExp(req.query.course, 'i')
    }
    try {
        const companies = await Company.find(searchOptions)
        res.render('companies/index', {
            companies: companies,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New Company Route
router.get('/new', (req,res) => {
    res.render('companies/new', {company: new Company() })
})

router.post('/', async (req,res) => { 
    const company = new Company({
        company_name : req.body.company_name,
        company_address: req.body.company_address,
        course: req.body.course
    })
    try {
        const newCompany = await company.save()
        //res.redirect(`companies/${newCompany.id}`)
        res.redirect(`companies/new`)
    } catch {
        res.render('companies/new', {
        company: company,
        errorMessage: 'Error Creating Company'
        })  
    }
})

module.exports = router