var express = require('express');
var router = express.Router();


function initUser(db){
    var userModel = require('./user.model')(db);



    return router;
}

module.exports = initUser;