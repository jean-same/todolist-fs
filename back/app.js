const express = require("express")
require('dotenv').config()

const app = express()

const bodyParser = require("body-parser")
const morgan = require("morgan")("dev")

const tasksRouter = require('./routers/tasksRouters')
const categoriesRouter = require('./routers/categoriesRouters')


app.use("/" , tasksRouter );
app.use("/" , categoriesRouter );


app.use(morgan)
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use( process.env.ROOT_API + "tasks" , tasksRouter)
app.use( process.env.ROOT_API + "categories" , categoriesRouter)

app.listen(process.env.SERVER_PORT)