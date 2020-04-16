var ObjectID = require('mongodb').ObjectID;

module.exports = (db)=>{
    var userModel = {}
    var userCollection = db.collection("users");

    var userTemplate = {
        userEmail: "",
        userPswd: "",
        userCompleteName: "",
        userCourse: "",
        userSubscription: "",
        userDateCreated: null
      }

}