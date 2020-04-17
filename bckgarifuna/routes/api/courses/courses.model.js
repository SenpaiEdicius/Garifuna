var ObjectID = require('mongodb').ObjectID;
var hasIndexOwner = false;
var hasIndexSku = false;
 
function pswdGenerator( pswdRaw ){
    var hashedPswd = bcrypt.hashSync(pswdRaw, 10);
    return hashedPswd;
  }

var coursesInit = function(db){
  var coursesModel = {};
  var coursesCollection = db.collection('courses');

  if (!hasIndexOwner) {
    coursesCollection.indexExists("owner_id_1", (err, rslt) => {
      if (!rslt) {
        coursesCollection.createIndex(
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
    coursesCollection.indexExists("sku_1", (err, rslt) => {
      if (!rslt) {
        coursesCollection.createIndex(
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

  var coursesTemplate = {
    sku:"",
    DescCorta: "",
    DescLong: "",
    Precio: "",
    Categoria: "",
    userDateCreated: null
  }

  coursesModel.getAll = (handler)=>{
    // handler(err, docs)
    var projection = {"sku":1,"DescCorta": 1, "DescLong": 1, "Categoria":1};
    coursesCollection.find({projection:projection}).toArray(handler);
  }

  /*
  coursesModel.getCourseByOwner = async (ownerId, customFilter, _page, _itemsPerPage, _sortBy, handler)=>{
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
    let cursor = coursesCollection.find(filter, options);
    let totalProds = await cursor.count();
    cursor.toArray((err, docs)=>{
      if (err) {
          console.log(err);
          return handler(err, null);
      } else {
          return handler(null, {total: totalProds, courses: docs});
      }
    });
  }; // getCourseByOwner*/

  coursesModel.getCourseByFilter = async (_page, _itemsPerPage, _sortBy, handler) => {
    var page = _page || 1;
    var itemsPerPage = _itemsPerPage || 10;
    var sortBy = _sortBy || "sku";
    var options = { "sku": 1, "DescCorta": 1, "DescLong": 1, "Precio": 1, "Categoria": 1};
    let cursor = coursesCollection.find().limit(itemsPerPage);
    let totalCourses = await cursor.count();
    cursor.toArray((err, docs) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
          console.log(docs);
        return handler(null, { total: totalCourses, courses: docs });
      }
    });
  }; // getCourseByFilter

  coursesModel.getCourseById = (prodId, handler) => {
      var filter= {"_id": new ObjectID(prodId)};
      coursesCollection.findOne(filter, (err, doc)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, doc);
        }
      });
  }; // getCourseById

  coursesModel.addNewCourse = ( ownerId, ownerName, courseInput, handler) => {
    var newCourse = {
      ...coursesModel.pseudoSchema,
      ...courseInput
    }
    newCourse.dateCreated = new Date().getTime();
    newCourse.ownerId= new ObjectID(ownerId);
    newCourse.ownerName= ownerName;
    coursesCollection.insertOne(newCourse, (err, rslt)=>{
      if(err){
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.ops[0]);
      }
    }); //insertOne
  }; //addNewCourse


  coursesModel.updateCourse = (prodId, courseInput, handler) => {
    var filter = { "_id": new ObjectID(prodId) };
    var { name, barcod, imgUrl, price} = courseInput;
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
    coursesCollection.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.value);
      }
    })
  }; //updateCourse

  coursesModel.addStockToCourse = (prodId, stockAmount, handler) => {
    var filter = {"_id": new ObjectID(prodId)};
    var updateCmd = {"$inc": {"stock": stockAmount}};
    coursesCollection.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, rslt.value);
        }
    })
  }; //addStockToCourse


  return coursesModel;
};

module.exports = coursesInit;
