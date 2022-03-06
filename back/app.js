const express = require("express")
require('dotenv').config()

let cors = require('cors')
const app = express()
app.use(cors())

const bodyParser = require("body-parser")
const morgan = require("morgan")("dev")

const tasksRouter = require('./routers/tasksRouters')
const categoriesRouter = require('./routers/categoriesRouters')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');

app.use( process.env.ROOT_API  + 'api-docs', swaggerUi.serve);
app.get( process.env.ROOT_API  + 'api-docs', swaggerUi.setup(swaggerDocument));

app.use(morgan)
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use( process.env.ROOT_API + "tasks" , tasksRouter)
app.use( process.env.ROOT_API + "categories" , categoriesRouter)

app.use("/" , tasksRouter );
app.use("/" , categoriesRouter );


app.listen(process.env.SERVER_PORT)