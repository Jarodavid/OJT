const express = require("express");
const router = express.Router();
const Student = require('../model/student');
const { response } = require("express");
// Getting all
router.get('/',async(req,res) => {
    try{
        const students = await Student.find()
        res.json(students)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
// Getting one
router.get('/:id',getStudent, (req,res) => {
    res.send(res.student.name)

})
// Creating one
router.post('/', async (req,res) => {
    const student = new Student({
        name: req.body.name,
        studentId: req.body.studentId
    })
    try{
        const newStudent = await student.save()
        res.status(201).json(newStudent)
    }catch(err){
     res.status(400).json({message: err.message})   
    }
})

// Updating one
router.patch('/:id',getStudent,async(req,res) => {
    if(req.body.name != null){
        res.student.name = req.body.name
    }
    if(req.body.studentId != null){
        res.student.studentId = req.body.studentId
    }
    try{
        const updatedStudent =  await res.student.save()
        res.json(updatedStudent)
    }catch(err){
        res.status(400).json({message: err.message})

    }
})
// Deleting one
router.delete('/:id',getStudent,async (req,res) => {
    try{
        await res.student.remove()
        res.json({message: 'Deleted Student'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getStudent(req, res, next){
    let student
    try{
        student = await Student.findById(req.params.id)
        if(student == null){
        return res.status(404).json({message:'Cannot Find Student'})
        }
    } catch (err){
        return res.status(500).json({message: 'error' })
    } 

    res.student = student
    next()
}


module.exports = router;