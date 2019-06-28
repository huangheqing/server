const express = require('express')
const mongo = require('mongodb').MongoClient
const app = express()
const port = 3000

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
