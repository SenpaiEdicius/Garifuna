var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');

function coursesInit(db) {
  var coursesModel = require("./courses.model")(db);
 
  router.get('/courses/find/:id', (req, res) => {
    var { id: _id } = req.params;
    var id = _id || '';
    coursesModel.getCourseById(id, (err, doc) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.status(200).json(doc);
    })
  })
/*
  router.get('/courses/:page/:items', (req, res)=>{
      var {page, items} = req.params;
      coursesModel.getCourseByOwner(
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
  }); // get courses page items*/

  router.post('/courses/add', (req, res)=>{
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
    coursesModel.addNewCourse(
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



  router.put('/courses/stock/:id' , (req, res)=>{
      var { stock : _stockDelta } = req.body;
      var stockDelta = 0;
      if (_stockDelta && !isNaN(_stockDelta)){
        stockDelta = parseInt(_stockDelta);
      }
      coursesModel.addStockToCourse( req.params.id, stockDelta, (err, rslt)=>{
        if(err){
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      })
  });

  router.put('/courses/upd/:id', (req, res)=>{
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
    coursesModel.updateCourse(
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

  router.put('/courses/updimg/:id', (req, res) => {
    var { imageurl } = req.body;
    var updateCurated = {};
    updateCurated["imgUrl"] = imageurl;
    coursesModel.updateCourse(
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

  router.put('/courses/del/:id', (req, res) => {
    coursesModel.updateCourse(
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

  router.get('/courses/:page/:items', (req, res)=>{
    var {page, items} = req.params;
    coursesModel.getCourseByFilter(
      parseInt(page),
      parseInt(items),
      "sku",
      (err, rslt)=>{
        if(err){
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      });
  }); // get courses page items


  return router;
}

module.exports = coursesInit;
