var ObjectID = require('mongodb').ObjectID;

module.exports = (db)=>{
    var pageModel = {};
    var pageCollection = db.collection('access');
    var pageTemplate = {
        pageName:"",
        pageURL:"",
        pageClass:"",
        hasAccess:[]
    }
    
    pageModel.menu = (userType,handler)=>{
        var query = {"hasAccess":userType,"pageClass":"MNU"};
        var projection = {"pageName":1,"pageURL":1};
        return pageCollection.find(query,{"projection":projection}).toArray(handler);
    }
    return pageModel;
}