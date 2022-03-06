let express = require("express")
let globalRouters = express.Router()



globalRouters.all('*', (req, res) => {
    res.status(404).json({
        "status": "not found",
        "message": "invalid url"
    })
})

module.exports = globalRouters