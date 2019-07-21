// This class handles RPC calls for getting items
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
module.exports = router;

// available item category
const material = 'material';
const technology = 'technology';
const ingredient = 'ingredient';
const animal = 'animal';

// item with category
const itemsMap = {
  wood: material,
  metal: material,
  steel: material,
  paper: material,
  cotton: material,
  pc: technology,
  macbook: technology,
  chicken: animal,
  horse: animal,
  sheep: animal,
  pig: animal,
  fish: animal,
  cow: animal,
  meat: ingredient,
  seafood: ingredient,
  vegetable: ingredient,
};

// Auto loot max possible amount for each category of items
const itemCategoryLootMap = {
  material: 100,
  technology: 1.3,
  ingredient: 50,
  animal: 3,
};

// random loot item endpoint
router.get('/loot/items', (req, res) => {
  var itemName = Object.keys(itemsMap)[
    Math.floor(Math.random() * Object.keys(itemsMap).length)
  ];
  var item = {
    item: itemName,
    amount: Math.floor(Math.random() * itemCategoryLootMap[itemsMap[itemName]]),
  };
  console.log(item);
  res.send(item);
});
