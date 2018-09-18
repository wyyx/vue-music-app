const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// use middlewares
app.use(bodyParser.json())

// services routes
require('./routes/all.routes')(app)

// start app
const PORT = 5000
app.listen(PORT, function() {
	console.log('server is up on port', PORT)
})
