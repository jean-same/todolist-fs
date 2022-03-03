const express = require("express");
require('dotenv').config()

const app = express();

let testController = require('./controllers/testController')
let tasksRouter = express.Router();
const bodyParser = require("body-parser")
const morgan = require("morgan")("dev")

tasksRouter.route("/")

    .get(testController.test )

    .post(testController.postTest )

tasksRouter.route("/:id")

    .get(testController.test )

    .put(testController.putTest )

    .delete(testController.test )



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use( process.env.ROOT_API + "tasks" , tasksRouter)
app.listen(process.env.SERVER_PORT);