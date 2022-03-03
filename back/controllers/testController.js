const Tasks = require('../models/Tasks')
const Categories = require('../models/Categories')

module.exports = {

    async test(req , res) {
        let id = req.params.id;
        const categories = await Categories.delete(id)
    
        res.status(200).json(categories)
/*
        try {
            const task = await Tasks.delete(id)
    
            res.status(200).json(task)
    
        } catch (error) {
            console.log(error)
        }
        */
    },

    async postTest(req , res) {
        
        let data = {
            name : req.body.name,
            status : req.body.status,
        }

        const categories = await Categories.add(data)
        res.status(201).json(categories)
        console.log(data)
    },

    async putTest(req , res) {

        let id = req.params.id;
        
        let data = {
            name : req.body.name,
            status : req.body.status,
        }

       try {
        const categories = await Categories.edit(id , data)
        res.status(201).json(categories)
        console.log(data)
       } catch (error) {
           console.log(error)
       } 


    }

  };