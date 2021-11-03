const express = require('express')
const fs = require('fs');

const app = express()
const port = 8000

app.use(express.json())

const routes = require('./config/routes.config');
app.use('/api', routes);

app.use((req, res, next)=>{ 
    console.log('Middleware 1')
    next()
})

app.listen(port, () => {
  console.log(`Employees app listening at http://localhost:${port}`)
})

module.exports = app;