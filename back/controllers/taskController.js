const { successMessage, success , notFound , error } = require("../utils/functions")

const Tasks = require('../models/Tasks');
const { findBy } = require("../models/Tasks");

module.exports = {

    async browse(req , res) {
        try {

            let query = req.query
            let tasks;

            if(Object.keys(query).length == 1) {
                const column = Object.keys(query)[0].trim()
                const value = Object.values(query)[0].trim()

                 tasks = await Tasks.findBy(column, value);
            } else {
                 tasks = await Tasks.findAll()
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

    async browseBy(req , res) {
        try {
            let col = req.query.status

            console.log(col)
            /*const tasks = await Tasks.findBy("status", 2)
            
            if (tasks.length == 0) {
                res.status(404).json(notFound())
            } else {
                res.status(200).json(success(tasks))
            }
*/
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
                        title : req.body.title,
                        completion : req.body.completion,
                        status : req.body.status,
                        id_category : req.body.id_category
                    }

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