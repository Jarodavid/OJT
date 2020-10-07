const express = require('express')
const router = express.Router()
const Student = require('../models/student')

//All Student Route
router.get('/', async (req,res) => {
    let searchOptions ={}
    if(req.query.name != null && req. query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const students = await Student.find(searchOptions)
        res.render('students/index', {
            students: students,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New Student Route
router.get('/new', (req,res) => {
    res.render('students/new', {student: new Student() })
})

router.post('/', async (req,res) => { 
    const student = new Student({
        name : req.body.name,
        studentId: req.body.studentId,
        course : req.body.course
    })
    try {
        const newStudent = await student.save()
        //res.redirect(`students/${newStudent.id}`)
        res.redirect(`students`)
    } catch {
        res.render('students/new', {
        student: student,
        errorMessage: 'Error Creating Student'
        })  
    }
})

module.exports = router