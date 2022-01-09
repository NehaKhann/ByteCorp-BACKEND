const express = require('express')

const routes = require('./routes') // includes the routes.js file
const cors = require('cors')

require("./conn")
const app = express()
app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js


app.listen(5000, () => {
    console.log("The API is running...")
})