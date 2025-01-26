const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()

const itemRoutes = require("./routes/itemRoutes")

const app = express()

app.use(cors())
app.use(bodyParser.json())

// Routes
app.use("/items", itemRoutes)

// Create HTTP server

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app
