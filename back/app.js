const express = require("express");
require('dotenv').config()

const app = express();

let tasksRouter = express.Router();

tasksRouter.route("/")

    .get((req , res) => {
        res.json("Homepage")
    })

app.use( process.env.ROOT_API + "tasks" , tasksRouter)
app.listen(process.env.SERVER_PORT);