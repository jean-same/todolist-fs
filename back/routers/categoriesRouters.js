const express = require("express")

const categoryRouter = express.Router()
const categoryController = require('../controllers/categoryController')

categoryRouter.route("/")

    .get(categoryController.browse)

    .post(categoryController.add)

categoryRouter.route("/:id")

    .get(categoryController.read)

    .put(categoryController.edit)

    .delete(categoryController.delete)

module.exports = categoryRouter
