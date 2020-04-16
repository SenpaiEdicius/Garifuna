var express = require('express');
var router = express.Router();

function initPage(db){
    var pageModel = require('./page.model')(db);

    //http://localhost:3000/api/page/menu
    router.post('/menu',(req,res)=>{
        //console.log(JSON.stringify(req.body));
        var userType = req.body.userType;
        pageModel.menu(userType,(err,result)=>{
          if(err){
            console.log(err);
            return res.status(500).json({"error":"Tipo de Usuario no encontrado"});
          }
          //console.log(JSON.stringify(result));
          return res.status(200).json(result);
        });
      });
    return router;
}

module.exports = initPage;