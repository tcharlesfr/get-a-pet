const express = require('express')
const cors = require('cors')

const app = express ()

// config json response
app.use(express.json())

// solve cors
app.use(cors({ credentials:true, origin: 'http://localhost:3000' }))

// public folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)

app.listen(5000)