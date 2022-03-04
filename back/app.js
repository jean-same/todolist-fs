const express = require("express")
require('dotenv').config()

const app = express()

const taskController = require('./controllers/taskController')
const categoryController = require('./controllers/categoryController')
const tasksRouter = express.Router()
const categoryRouter = express.Router()
const bodyParser = require("body-parser")
const morgan = require("morgan")("dev")

tasksRouter.route("/")

    .get(taskController.browse)

    .post(taskController.add)

    
tasksRouter.route("/:id")

    .get(taskController.read)

    .put(taskController.edit)

    .delete(taskController.delete)

categoryRouter.route("/")

    .get(categoryController.browse)

    .post(categoryController.add)

categoryRouter.route("/:id")

    .get(categoryController.read)

    .put(categoryController.edit)

    .delete(categoryController.delete)


app.use(morgan)
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use( process.env.ROOT_API + "tasks" , tasksRouter)
app.use( process.env.ROOT_API + "categories" , categoryRouter)
app.listen(process.env.SERVER_PORT)