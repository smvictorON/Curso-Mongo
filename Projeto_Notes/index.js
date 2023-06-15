const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

const db = require('./db/connection')

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

const notesRoutes = require('./routes/notes')

app.get('/', async function(req, res){
  const notes = await db.getDB().db().collection('notes').find({}).toArray()
  res.render('home', {notes})
})

app.use('/notes', notesRoutes)

db.initDB((err, db) => {
  if(err){
    console.log(err)
  }else{
    console.log(`Banco conectou!`)
    app.listen(port, () => {
      console.log(`Aplicação rodando na porta ${port}!`)
    })
  }
})