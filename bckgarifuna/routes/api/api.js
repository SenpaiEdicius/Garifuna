//EDITAR ROUTERS

var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportJWT = require('passport-jwt');
var extractJWT = passportJWT.ExtractJwt;
var jwtStrategy = passportJWT.Strategy;


passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey:'cuandoLosGatosNoEstanFiestanlosRatonesHacen'
    },
    (payload, next)=>{
        console.log(payload);
        var user = payload;
        return next(null, user);
    }
  )
)


function initApi(db){

    /// Routers de Entidades
    var adminRouter = require('./admin/admin')(db);

    router.use('/admin', adminRouter);

    var jwtAuthMiddleware = passport.authenticate('jwt',{session:false});

 return router;
}
//module.exports = router;
module.exports = initApi;

