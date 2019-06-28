const express = require('express')
const mongo = require('mongodb').MongoClient

// Create a router for this manager
var router = express.Router();

var url = "mongodb://localhost:27017/";

// Export this router so the server entry point can call it
module.exports = router

// use :name to specify id in the path param
router.get('/user/:name', (request, response) => {
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