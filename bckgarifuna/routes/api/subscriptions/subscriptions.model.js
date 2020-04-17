var ObjectID = require('mongodb').ObjectID;
var hasIndexOwner = false;
var hasIndexSku = false;
 
function pswdGenerator( pswdRaw ){
    var hashedPswd = bcrypt.hashSync(pswdRaw, 10);
    return hashedPswd;
  }

var subsInit = function(db){
  var subsModel = {};
  var subsCollection = db.collection('subscriptions');

  if (!hasIndexOwner) {
    subsCollection.indexExists("owner_id_1", (err, rslt) => {
      if (!rslt) {
        subsCollection.createIndex(
          { ownerID: 1 },
          { name: "owner_id_1" },
          (err, rslt) => {
            console.log(err, rslt);
            hasIndexOwner = true;
          });
      } else {
        hasIndexOwner = true;
      }
    });
    subsCollection.indexExists("sku_1", (err, rslt) => {
      if (!rslt) {
        subsCollection.createIndex(
          { sku: 1 },
          { unique:true, name: "sku_1" },
          (err, rslt) => {
            console.log(err, rslt);
            hasIndexSku = true;
          });
      } else {
        hasIndexSku = true;
      }
    });
  }

  var subsTemplate = {
    sku:"",
    DescCorta: "",
    DescLong: "",
    Precio: "",
    Categoria: "",
    userDateCreated: null
  }

  subsModel.getAll = (handler)=>{
    // handler(err, docs)
    var projection = {"sku":1,"DescCorta": 1, "DescLong": 1, "Categoria":1};
    subsCollection.find({projection:projection}).toArray(handler);
  }

  /*
  subsModel.getSubByOwner = async (ownerId, customFilter, _page, _itemsPerPage, _sortBy, handler)=>{
    var page = _page || 1;
    var itemsPerPage = _itemsPerPage || 25;
    var customFilterf = customFilter || {};
    var sortBy = _sortBy || "sku";
    var filter = {ownerId : new ObjectID(ownerId), ...customFilterf};
    var options = {
      "limit": itemsPerPage,
      "skip": ((page - 1) * itemsPerPage),
      "projection": {
        "name": 1, "sku":1, "barcod": 1, "price": 1, "stock":1
      },
      "sort": [[sortBy, 1]]
    };
    let cursor = subsCollection.find(filter, options);
    let totalProds = await cursor.count();
    cursor.toArray((err, docs)=>{
      if (err) {
          console.log(err);
          return handler(err, null);
      } else {
          return handler(null, {total: totalProds, subs: docs});
      }
    });
  }; // getSubByOwner*/

  subsModel.getSubByFilter = async (_page, _itemsPerPage, _sortBy, handler) => {
    var page = _page || 1;
    var itemsPerPage = _itemsPerPage || 10;
    var sortBy = _sortBy || "sku";
    var options = { "sku": 1, "DescCorta": 1, "DescLong": 1, "Precio": 1, "Categoria": 1};
    let cursor = subsCollection.find().limit(itemsPerPage);
    let totalSubs = await cursor.count();
    cursor.toArray((err, docs) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
          console.log(docs);
        return handler(null, { total: totalSubs, subs: docs });
      }
    });
  }; // getSubByFilter 

  subsModel.getSubById = (id, handler) => {
      var filter= {"_id": new ObjectID(id)};
      subsCollection.findOne(filter, (err, doc)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, doc);
        }
      });
  }; // getSubById

  subsModel.addNewSub = ( ownerId, ownerName, subInput, handler) => {
    var newSub = {
      ...subsModel.pseudoSchema,
      ...subInput
    }
    newSub.dateCreated = new Date().getTime();
    newSub.ownerId= new ObjectID(ownerId);
    newSub.ownerName= ownerName;
    subsCollection.insertOne(newSub, (err, rslt)=>{
      if(err){
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.ops[0]);
      }
    }); //insertOne
  }; //addNewSub

  subsModel.updateSub = (prodId, subInput, handler) => {
    var filter = { "_id": new ObjectID(prodId) };
    var { name, barcod, imgUrl, price} = subInput;
    var finalUpdate = {};
    if(name){
      finalUpdate.name = name;
    }
    if(barcod){
      finalUpdate.barcod = barcod;
    }
    if(imgUrl){
      finalUpdate.imgUrl = imgUrl;
    }
    if(price){
      finalUpdate.price = price;
    }
    var updateCmd = { "$set": finalUpdate };
    subsCollection.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.value);
      }
    })
  }; //updateSub

  subsModel.addStockToSub = (prodId, stockAmount, handler) => {
    var filter = {"_id": new ObjectID(prodId)};
    var updateCmd = {"$inc": {"stock": stockAmount}};
    subsCollection.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, rslt.value);
        }
    })
  }; //addStockToSub


  return subsModel;
};

module.exports = subsInit;
