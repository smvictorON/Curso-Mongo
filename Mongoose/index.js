//Conexao Mongoose
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/testmongoose', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', () => {
  console.log('conectado ao mongodb')
})

//Schema
const pessoaSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  profissao: String
})

//Model
const Pessoa = mongoose.model("Pessoa", pessoaSchema)

// const victor = new Pessoa({
//   nome: "victor",
//   idade: 28,
//   profissao: "desenvolvedor"
// })
// console.log(victor)

// const lamara = new Pessoa({
//   nome: "lamara",
//   idade: 34,
//   profissao: "auxiliar adm"
// })
// console.log(lamara)

//Inserindo - save
// victor.save().then(() => {
//   console.log("salvo com sucesso")
// }).catch((err) => {
//   console.log('err', err)
// })

//Buscando
// Pessoa.find({}).then((pessoas) => {
//   console.log(pessoas)
// }).catch((err) => {
//   console.log('err', err)
// })

//Deletando
// Pessoa.deleteOne({nome: "victor"}).then((pessoas) => {
//   console.log(pessoas)
// }).catch((err) => {
//   console.log('err', err)
// })

//Atualizando
// Pessoa.updateOne({nome: "lamara"}, {profissao: "ui/ux"}).then((pessoas) => {
//   console.log(pessoas)
// }).catch((err) => {
//   console.log('err', err)
// })

//Where
// const getPessoaNomeIdade = async (nome, idade) => {
//   const pessoa = await Pessoa
//                         .where('nome', nome)
//                         .where('idade').gte(idade)
//                         .exec()

//   console.log(pessoa)
// }

// getPessoaNomeIdade('lamara', 30)