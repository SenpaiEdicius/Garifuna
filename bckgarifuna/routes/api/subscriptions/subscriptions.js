var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');

function subsInit(db) {
  var subsModel = require("./subscriptions.model")(db);
 
  router.get('/subscriptions/:id', (req, res) => {
    var id =  req.params.id ;
    subsModel.getSubById(id, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({"error": "error"});
      }
      return res.status(200).json(doc);
    })
  })

/*
  router.get('/subscriptions/:page/:items', (req, res)=>{
      var {page, items} = req.params;
      subsModel.getSubByOwner(
        req.user._id,
        {},
        parseInt(page),
        parseInt(items),
        "sku",
        (err, rslt)=>{
          if(err){
            return res.status(500).json({});
          }
          return res.status(200).json(rslt);
        });
  }); // get subs page items*/

  router.post('/subscriptions/add', (req, res)=>{
    var {name, sku, barcod, price, stock} = req.body;
    var insertCurated= {};
    if(name && !(/^\s*$/).test(name)){
      insertCurated.name = name;
    }
    if (sku && !(/^\s*$/).test(name)) {
      insertCurated.sku = sku;
    }
    if (barcod && !(/^\s*$/).test(barcod)) {
      insertCurated.sku = sku;
    }
    if (price && !isNaN(price)) {
      insertCurated.price = parseFloat(price);
    }
    if (stock && !isNaN(stock)) {
      insertCurated.stock = parseFloat(stock);
    }
    subsModel.addNewSub(
       req.user._id,
       req.user.userCompleteName,
       insertCurated,
       (err, rslt)=>{
         if(err){
           return res.status(500).json({});
         }
         return res.status(200).json(rslt);
      }
    );
  });



  router.put('/subscriptions/stock/:id' , (req, res)=>{
      var { stock : _stockDelta } = req.body;
      var stockDelta = 0;
      if (_stockDelta && !isNaN(_stockDelta)){
        stockDelta = parseInt(_stockDelta);
      }
      subsModel.addStockToSub( req.params.id, stockDelta, (err, rslt)=>{
        if(err){
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      })
  });

  router.put('/subscriptions/upd/:id', (req, res)=>{
    var { name, price, stock, status } = req.body;
    var updateCurated = {};
    if (name && !(/^\s*$/).test(name)) {
      updateCurated.name = name;
    }
    if (sku && !(/^\s*$/).test(name)) {
      updateCurated.sku = sku;
    }
    if (barcod && !(/^\s*$/).test(barcod)) {
      updateCurated.sku = sku;
    }
    if (price && !isNaN(price)) {
      updateCurated.price = parseFloat(price);
    }
    if (stock && !isNaN(stock)) {
      updateCurated.stock = parseFloat(stock);
    }
    subsModel.updateSub(
      req.params.id,
      updateCurated,
      (err, rslt) => {
        if (err) {
          return res.status(500).json({});
        } 
        return res.status(200).json(rslt);
      }
    );
  });

  router.put('/subscriptions/updimg/:id', (req, res) => {
    var { imageurl } = req.body;
    var updateCurated = {};
    updateCurated["imgUrl"] = imageurl;
    subsModel.updateSub(
      req.params.id,
      updateCurated,
      (err, rslt) => {
        if (err) {
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      }
    );
  });

  router.put('/subscriptions/del/:id', (req, res) => {
    subsModel.updateSub(
      req.params.id,
      {"status":"INA"},
      (err, rslt) => {
        if (err) {
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      }
    );
  });

  router.get('/subscriptions/:page/:items', (req, res)=>{
    var {page, items} = req.params;
    subsModel.getSubByFilter(
      parseInt(page),
      parseInt(items),
      "sku",
      (err, rslt)=>{
        if(err){
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      });
  }); // get subs page items


  return router;
}

module.exports = subsInit;
