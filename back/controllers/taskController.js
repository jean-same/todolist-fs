const { successMessage, success , notFound , error } = require("../utils/functions")

const Tasks = require('../models/Tasks');
const { findBy } = require("../models/Tasks");

module.exports = {

    async browse(req , res) {
        try {

            let query = req.query
            let tasks, columnToFind, columnValue

            if(Object.keys(query).length == 1) {
                columnToFind = Object.keys(query)[0]
                columnValue = Object.keys(query)[0] == "order" ? Object.values(query)[0] : parseInt(Object.values(query)[0])
            }
            console.log(columnToFind)

            if((columnToFind == "status" || columnToFind == "completion") && (Number.isInteger(columnValue))  ) {
                 tasks = await Tasks.findBy(columnToFind.trim() , columnValue );
            } else {

                if(columnToFind == "order" && columnValue.toUpperCase() == "DESC") {
                    columnValue = columnValue.toUpperCase()
                } else [
                    columnValue = ""
                ]

                 tasks = await Tasks.findAll(columnValue)
            }
            
            if (tasks.length == 0) {
                res.status(404).json(notFound())
            } else {
                res.status(200).json(success(tasks))
            }

        } catch (err) {
            res.status(422).json(error(err))
            console.log(err)
        }
    },

    async read(req , res) {
        let id = req.params.id;

        try {
            const task = await Tasks.find(id)

            if (task.length == 0) {
                res.status(404).json(notFound())
            } else {
                res.status(200).json(success(task))
            }
    
        } catch (error) {
            res.status(422).json(error(err))
        }
    },

    async edit(req ,res) {

            const id = req.params.id;
            const task = await Tasks.find(id)

            if(task.length != 0 ) {

                try {
                    const data = {
                        title : req.body.title ? req.body.title : task[0].title,
                        completion : req.body.completion ? req.body.completion : task[0].completion,
                        status : req.body.status ? req.body.status : task[0].status,
                        id_category : req.body.id_category ? req.body.id_category : task[0].id_category,
                    }
                    console.log(data)

                    await Tasks.update(id , data)
                    res.status(200).json(successMessage("Task edited successfully"))

                } catch (err) {
                    res.status(422).json(error(err.sqlMessage))
                    
                }

            } else {
                res.status(404).json(notFound())
            }
            
    },

    async add(req ,res) {

            try {
                const data = {
                    title : req.body.title,
                    completion : req.body.completion ? req.body.completion : 0 ,
                    status : req.body.status ? req.body.status : 1 ,
                    id_category : req.body.id_category
                }

                console.log(data)

                await Tasks.insert(data)
                res.status(201).json(successMessage("Task added successfully"))

            } catch (err) {
                res.status(422).json(error(err.sqlMessage))
                
            }
        
    },

    async delete(req , res) {

        const id = req.params.id;
        const task = await Tasks.find(id)

        if(task.length != 0 ) {

            try {
                await Tasks.delete(id)
                res.status(200).json(successMessage("Task deleted successfully"))
            } catch (err) {
                res.status(422).json(error(err))
            }
        } else {
            res.status(404).json(notFound())
        }
    }
  
  };