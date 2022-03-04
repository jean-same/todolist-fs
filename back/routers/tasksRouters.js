const express = require("express")

const tasksRouter = express.Router()
const taskController = require('../controllers/taskController')

tasksRouter.route("/")

    .get(taskController.browse)

    .post(taskController.add)

    
tasksRouter.route("/:id")

    .get(taskController.read)

    .put(taskController.edit)

    .delete(taskController.delete)

module.exports = tasksRouter