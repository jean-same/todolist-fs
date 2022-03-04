const { successMessage, success , notFound , error } = require("../utils/functions")

const Categories = require('../models/Categories')

module.exports = {

    async browse(req , res) {
        try {

            const categories = await Categories.findAll()
            
            if (categories.length == 0) {
                res.status(404).json(notFound())
            } else {
                res.status(200).json(success(categories))
            }

        } catch (err) {
            res.status(422).json(error(err))
        }
    },

    async read(req , res) {
        let id = req.params.id;

        try {
            const category = await Categories.find(id)

            if (category.length == 0) {
                res.status(404).json(notFound())
            } else {
                res.status(200).json(success(category))
            }
    
        } catch (error) {
            res.status(422).json(error(err))
        }
    },

    async edit(req ,res) {

            const id = req.params.id;
            const category = await Categories.find(id)

            if(category.length != 0 ) {
                try {
                    const data = {
                        name : req.body.name,
                        status : req.body.status,
                    }

                    await Categories.update(id , data)
                    res.status(200).json(successMessage("Category edited successfully"))

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
                    name : req.body.name,
                    status : req.body.status,
                }

                await Categories.insert(data)
                res.status(201).json(successMessage("Category added successfully"))

            } catch (err) {
                res.status(422).json(error(err.sqlMessage))
                
            }
        
    },

    async delete(req , res) {

        const id = req.params.id;
        const category = await Categories.find(id)

        if(category.length != 0 ) {

            try {
                await Categories.delete(id)
                res.status(200).json(successMessage("Category deleted successfully"))
            } catch (err) {
                res.status(422).json(error(err))
            }
        } else {
            res.status(404).json(notFound())
        }
    }
  
  };