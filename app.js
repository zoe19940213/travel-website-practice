//require packages in the project
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')

// Set related vraiable
const port = 3000

// template engine setting
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file setting
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen
app.listen(port, () => {
  console.log(`Express is now listening on http://localhost:${port}`)
})