const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017/notesDB"

let _db

const initDB = cb => {
  MongoClient.connect(url, {useUnifiedTopology: true}).then(client => {
    _db = client
    cb(null, _db)
  }).catch(err => {
    cb(err);
  })
}

const getDB = () => {
  return _db
}

module.exports = {
  initDB, getDB
}