var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

const expense = require('../models/expense');


router.get('/expenses', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/expense', (req, res, next) => {
  const { name, amount } = req.body;
  if(!name || !amount){
    return res.status(400).json({
      message: 'Missing name or amount'
    })
  }

  const payload = { name, amount };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});

router.delete('/expense/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectId(id);

  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
