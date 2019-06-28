const express = require('express')
const mongo = require('mongodb').MongoClient
const app = express()

var url = "mongodb://localhost:27017/";

// use :name to specify id in the path param
app.get('/user/:name', (request, response) => {
    mongo.connect(url, function(err, client) {
      if (err) throw err;
  
      // the :name can be retrieved by calling request.params.name
      var query = { name: request.params.name };
  
      // In this mongo version function db and close has been moved to function client
      var db = client.db('city');
      db.collection("city").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        response.send(result);
        client.close();
      });
    });
  })