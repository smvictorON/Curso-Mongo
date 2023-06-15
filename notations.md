- MongoDB é o bando não relacional mais utilizado
- Os dados são inseridos em formato de objecto JSON
- Sintaxe semelhante ao JS

- Entidades
Database: onde ficam as collections.
Collection: onde ficam os dados(docs).
Documents: são os dados no MongoDB.

- BSON (binary json)
é uma variação do JSON

# DICAS --------------------------------------
- Para iniciar o mongo no terminal basta digitar **mongo**

- Se der um use em uma database que nao existe e criar um dado lá ele vai criar a database

- Collections podem ser criadas dinamicamente ex: ao inserir um valor ela ja cria a collection

- Pretty é utilizado para uma melhor apresentação dos dados **ex: db.coll.find({}).pretty()**, é como se "identasse" o dado para mostrar-

- O _id do mongo é criado baseado no tempo e é unico, mesmo se for adicionados dados simultaneos, vai ter uma diferença de tempo e ele tem tambem um index, deixando pesquisa por _id mais rapidas, é sempre retornando o _id mesmo se não tiver no find, não é obrigatorio usar o id do mongo, pode ser mudado o valor no campo na criação para seguir qualquer padrao

- Indices são lidos da esquerda para a direita, o _id na collection já em um índice e podem ser criados outros se for necessário para aumentar a performance, deve ser criado um indice sempre que precisar buscar varias vezes na tabela por um campo que nao seja o _id, porém se uma collection tiver muitos indeces isso vai ter o efeito contrário, deve ser pensado bem antes de criar

- Base admin, config e local são padrões do mongo

*esse script exclui todos os banco que nao estão incluidos no array*
Mongo().getDBNames().forEach(function(db){
  if(['admin', 'config', 'local'].indexOf(db) < 0){
    Mongo().getDB(db).dropDatabase()
  }
})

- Quando se tem muitos registro no terminal do mongo ele vai retornar uma quantidade x depois para continuar listando os dados voce precisa digitar **it** é como se fosse um tipo de paginação

- O mongo aceita que strings sejam inseridas tanto com aspas duplas ou simples, se ele encontra aspas duplas dentro de outras aspas duplas ele grava com um scape \"

- Podemos usar o **typeof** para verificar o tipo de um campo no mongo no shell podemos atribuir um find em uma variavel e depois usar typeof variavel.campo para saber seu valor **ex:const suavar = db.suacoll.findOne({seucampo: valor})** e depois usamos **typeof suavar.seucampo** para saber o tipo

- Datas no mongo são salvas no formato ISO, para ter a data atual podemos utilizar o new Date()

**backup de collections**
db.getCollection('suacoll').aggregate([
  { $out: "nomedasuacoll_bkp"}
])

- Para o mongo todos os numeros são double, porém se o dado numérico for inteiro devemos explicitamente declara isso com NumberInt(numero)

**embedded documents** é quando colocamos por exemplo um doc de endereço dentro do doc de
usuarios, porém isso deve ser feito com muito cuidado, pois pode gerar problemas

- Para relações **many to many** é aconselhado criar uma collection intermediaria com os
ids das duas collections

- No mongo o limite do tamanho de um doc é 16mb, por isso devemos evitar **embedded docs**
ao invés disso devemos criar varias collections

- No mongo para procurar um doc por um campo array se ele tem um elemento basta fazer **db.suacoll.findOne({seucampoarray: valor})** sem usar [], se usarmos o [] ele vai trazer o doc que tenha somente os valores que voce passou e nao o doc que tenha esse item no array tambem, nesse caso se quiser os docs que tenham varios dados no campo array e voce quer somente o que tenha certos valores temos que utilizar o **$all**
**db.suacoll.findOne({seucampoarray: {$all: [valor1, valor2]}})**, para procurar em um array de objeto precisa abrir o objeto e ele só vai retonar o doc que tenha exatamente esse item no array **db.suacoll.findOne({seucampoarray: {primeirocampo: valor, segundocampo: valor}})**

- No mongo para retornar somente os campos necessarios voce mostre explicitar isso no comando dessa forma **db.suacoll.findOne({}, {seucampo: 1, outrocampo: 1})**, fora esses campos o _id sempre vem junto, se quiser remover o _id precisa adicionar o _id como 0 na descriminação dos campos

- Aggregate é uma ferramenta que nos permite fazer finds mais complexos, podendo ser feito calculos e manipular os dados na hora da execução como por exemplo calcular a média de uma coluna numero em todos os documentos filtrados

- Sempre colocar os matchs no inicio dos aggregates

- Schema são as representações das collections utilizados pelo mongoose

- Where é um método do mongoose para unir varios filtros

# COMANDOS --------------------------------------
*show dbs*          <- mostra todas as databases
*use nomedobanco*   <- escolhe a database
*db*                <- mostra o banco que está sendo usado
*show collections*  <- mostra todas as collections da base

*mongoimport <arquivo> -d <database> -c <collection>*
importa dados json de um arquvio em uma base e uma collection

*mongoexport -c <collection> -d <database> -o <outputfile>*
exporta os dados de uma collection para um arquivo json

*mongodump -d <database> -o <diretorio>*
cria um diretório com todos as collections em arquivos

*mongorestore <diretorio>*
cria um base a partir de um diretorio com as collections

*mongostat*
abre uma consulta em tempo real do status do mongo db
para monitoramento

-------------------
*db.suacoll.insertOne({})*
cria um doc na collection

*db.suacoll.insertMany([{},{},...])*
cria varios docs na collection
Write Concern é uma configuração que pode ser adicionada
para limitar o tempo de execução da inserção, retornando
timeout caso exceda o tempo
*{w: "majority", wtimeout: 100}*
a inserção tem 100ms para ser executada, é usado para
manter a base estável sem ficar presa em um insert grande

*db.suacoll.insert()* **DEPRECADO**
cria docs na collection, é como se fosse o
One e Many junto, mas nao retorna o _id
dos objetos criados

*db.suacoll.findOne({})*
encontra um doc na collection

*db.suacoll.find({})*
encontra varios docs na collection
*.count()*
usando o count no final do find ele retorna o numero de
registro que são retornados

*db.suacoll.updateOne({},{$set: {seucampo: valor}})*
atualiza um doc na collection, sempre devemos usar o
*$set* no update para atualizar um registro ou criar
um campo no registro

*db.suacoll.updateMany({},{$set: {seucampo: valor}})*
atualiza varios docs na collection, se nao tiver um filtro
ele vai atualizar todos os docs da collection

*db.suacoll.replaceOne({}, {seucampo: valor})*
atualiza um doc na collection, setando substituindo
um doc existenta pelo doc enviado

*db.suacoll.deleteOne({})*
deleta um doc na collection

*db.suacoll.deleteMany({})*
deleta um doc na collection

*db.createColletion("nomedacollection")*
e podemos tambem adicionar opções como, quando vamos inserir
limitações na collection na criação precisamos colocar
*{capped: true, size: 1000, max: 3}*
capped é da dizer que ela é limatada, size é o numero de bytes
maximo que ela pode ter e max é a quantidade max de registros
se voce adicionar mais de registro do que o máximo ele vai
descartar o mais velho para colocar o novo registro, essa
limitação é bastante usado para logs

*db.suacoll.drop()*
deleta uma collection, se retornar true ela foi dropada, se
nao tiver a collection o comando retorna false

*db.suacoll.createIndex({seucampo: "tipodoindice"})*
cria um indice para um campo, no tipo de indice pode ser o numero 1
como padrao, é possivel tambem criar indices aninhados 'seucampo.campo',
tambem se passar 2 campos na criação ele cria um *indice composto*
podendo ser um dos campos já um indice, caso o tipo do indice seja
do tipo "text" só podemos ter um por collection, ele busca por
texto em um campo utilizado em um find com $text e $search

*db.suacoll.getIndexes()*
retorna os indices da collection

*db.suacoll.dropIndex({seucampo: 1})*
retorna os indices da collection, se nao for passado o campo ele deleta
todos os indices menos o _id

*Esse comando retorna os indices de todas as collections*
db.getCollectionNames().forEach(function(coll) {
  indexes = db[coll].getIndexes()
  print("índices de " + coll + ":")
  printjson(indexes)
})

*db.find({seucampo: valor}).explain()*
a palavra explain após um find retorna dados de como foi feito find
pelo mongo, como por exemplo de onde veio a consulta, mas temos tambem
o campo winningPlan e dentro dele temos o 'inputStage.stage', que é o
tipo de consulta usada

**COLLSCAN**: Realiza uma varredura completa (scan) da coleção, percorrendo todos os documentos para encontrar os resultados desejados. Esse estágio é geralmente considerado ineficiente para coleções grandes.

**IXSCAN**: Utiliza um índice para realizar uma busca eficiente dos documentos. Esse estágio indica que um índice foi utilizado para otimizar a consulta.

**FETCH**: Recupera os documentos correspondentes aos resultados encontrados em estágios anteriores, como resultado de um índice.

**SORT**: Ordena os resultados da consulta com base em um ou mais campos.

**PROJECTION**: Projeta apenas os campos especificados na consulta, reduzindo a quantidade de dados retornados.

**LIMIT**: Limita o número de documentos retornados pela consulta.

**SKIP**: Pula um número especificado de documentos antes de retornar os resultados.

**JOIN**: Realiza a junção (join) de dados de várias coleções.

*db.dropDatabase()*
remove a base de dados com todos os registros nela


# OPERADORES --------------------------------------

**$in**
*db.suacoll.find({seucampo: {$in: ["algo", "outro", ...]}})*
seleciona todos os docs que seucampo se encaixe em um dos
dados passados no array

**$gt** (greater then)
*db.suacoll.find({seucampo: {$gt: 100}})*
seleciona todos os docs que seucampo seja maior que 100
adicionando o e(igual) no final permitimos tambe que seja igual

**$lt** (less then)
*db.suacoll.find({seucampo: {$lt: 100}})*
seleciona todos os docs que seucampo seja menor que 100
adicionando o e(igual) no final permitimos tambe que seja igual

**$eq** (equal)
*db.suacoll.find({seucampo: {$eq: 100}})*
seleciona todos os docs que seucampo seja igual a 100
pode ser resumido com *{seucampo: 100}*

**$ne** (not equal)
*db.suacoll.find({seucampo: {$ne: 100}})*
seleciona todos os docs que seucampo seja diferente de 100

**$or**
*db.suacoll.find({$or: [{seucampo: {$gt: 100},{outrocampo: {$lt: 100}}]})*
se reparar ele é semelhante ao $in porém o $in tem o uso para
"filtrar" docs pelo mesmo campo ja o $or pode ser colocado com
varios campos

**$exists**
*db.suacoll.find({seucampo: {$exists: true}})*
retorna todos os docs que contenham esse campo

**$text**
*db.suacoll.find({$text: {$search: "algum texto"}})*
retorna todos os docs que contenham o texto espeficado no campo informado

**$push**
*db.suacoll.updateOne({filtro},{$push: {seuarray: novovalor}})*
com push podemos adicionar um item em um campo array no mongo

**$all**
*db.suacoll.findOne({seucampoarray: {$all: [valor1, valor2]}})*
vai retornar todos os docs que tenha esses 2 valores

**$size**
*db.suacoll.findOne({seucampoarray: {$size: quantidadedeelementos}})*
vai retornar todos os docs que tenha a quantidade de elementos no
campo array

**$elemMatch**
*db.suacoll.findOne({seucampoarray: {$elemMatch: {primeirocampo: valor, segundocampo: valor}}})*
usado para procurar em arrays e vai retonar os docs que tenha alguns
dos campos, nao precisa ter os dois

**$inc**
*db.suacoll.updateOne({filtro}, {$inc: {seucamponumerico: 10}})*
incrementa um valor em um campo numérico, é possivel incrementar valor negativo

**$min**
*db.suacoll.updateOne({filtro}, {$min: {seucamponumerico: 10}})*
atualiza o valor do campo caso o valor do registro seja maior do que o do comando

**$max**
*db.suacoll.updateOne({filtro}, {$max: {seucamponumerico: 10}})*
atualiza o valor do campo caso o valor do registro seja menor do que o do comando

**$mul**
*db.suacoll.updateOne({filtro}, {$mul: {seucamponumerico: 2}})*
multiplica o valor de algum campo pelo que foi passado

**$rename**
*db.suacoll.updateOne({filtro}, {$rename: {seucampo: "novo_nome"}})*
renomeia um campo

**$unset**
*db.suacoll.updateOne({filtro}, {$unset: {seucampo: ""}})*
remove campos do documento

**$addToSet**
*db.suacoll.updateOne({filtro}, {$addToSet: {seuarray: {$each: [1,2,3]}}})*
adiciona valores se eles não existirem no campo array indicado

**$pop**
*db.suacoll.updateOne({filtro}, {$pop: {seuarray: 1}})*
remove o ultimo(1) ou o primeiro(-1) elemento de um campo array

**$push**
*db.suacoll.updateOne({filtro}, {$push: {seuarray: "valor"}})*
adiciona um elemento no fim de um array, pode ser usado com **$each** para adicionar mais de um item de uma vez, porém ele nao checa se ja tem o campo no array para adicionar, pode ocorrer duplicação

**$pullAll**
*db.suacoll.updateOne({filtro}, {$pullAll: {seuarray: [valor1, valor2]}})*
remove varios itens de um array, se tiver items com o mesmo valor, ele vai remover todas as ocorrencias que tiverem no array

# AGGREGATE ------------------------------

**$bucket**
*agrupa resultados {$sum: 1} que dizer que cada doc conta 1*
db.books.aggregate([
  {
    $bucket: {
      groupBy: "$pageCount",
      boundaries: [100, 200, 300, 400, 500, 600, 700],
      default: "OTHERS",
      output: {
        "count": {$sum: 1}
      }
    }
  }
])

**$bucketAuto**
*agrupa resultados de forma automática*
db.books.aggregate([
  {
    $bucketAuto: {
      groupBy: "$categories",
      buckets: 50
    }
  }
])

**$collStats**
*usado para retornar dados da collections*
db.books.aggregate([
  {
    $collStats: {
      queryExecStats: {},
      count: {}
    }
  }
]).pretty()

**$sort**
*ordena os resultados do aggregate 1 crescente -1 decrescente*
db.books.aggregate([
  {
    $sort: {pageCount: 1}
  }
]).pretty()

**$limit**
*limita os resultados do aggregate*
db.books.aggregate([
  { $sort: {pageCount: -1} },
  { $limit: 3 }
]).pretty()

**$match**
*serve para filtrar os registros por um campo*
db.books.aggregate([
  { $sort: {pageCount: -1} },
  { $match: {authors: "Gavin King"} },
  { $limit: 3 }
]).pretty()

**$out**
*cria uma nova collection com o resultado do aggregate*
db.books.aggregate([
  { $match: {authors: "Gavin King"} },
  { $limit: 5 },
  { $out: "gave_king_coll" }
]).pretty()

**$project**
*define os campos a serem retornados pelo aggregate*
db.books.aggregate([
  { $match: {authors: "Gavin King"} },
  { $project: {title: 1, pageCount: 1} }
])

**$sample**
*gera uma amostragem aleatoria com a quantidade definifida*
db.books.aggregate([
  { $match: {categories: "Java"} },
  { $sort: {pageCount: -1} },
  { $project: {title: 1, authors: 1} },
  { $sample: {size: 3} }
]).pretty()

**$skip**
*pula certo numero de documentos*
db.books.aggregate([
  { $match: {categories: "Microsoft"} },
  { $sort: {pageCount: -1} },
  { $project: {title: 1, autpageCounthors: 1} },
  { $skip: 2 },
  { $limit: 2 }
]).pretty()

**$unwind**
*desconstroi um array*
db.books.aggregate([
  { $unwind: "$categories" },
  { $project: {categories: 1}}
]).pretty()

**$sortByCount**
*ordena por um campo junto com unwind por ser usado para*
*selecionar pelo numero de ocorrencia*
db.books.aggregate([
  { $unwind: "$categories" },
  { $sortByCount: "$categories" },
]).pretty()

**$unset**
*define os campos a serem excluidos do aggregate*
db.books.aggregate([
  { $match: {categories: "PowerBuilder"} },
  { $sort: {pageCount: -1} },
  { $unset: ["_id", "longDescription"]}
]).pretty()

**$count**
*retorna a contagem dos dados*
db.books.aggregate([
  { $match: {categories: "Java"} },
  { $count: "contagem" }
]).pretty()


