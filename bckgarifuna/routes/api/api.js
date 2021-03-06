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
    var seguridadRouter = require('./seguridad/seguridad')(db);
    var coursesRouter = require('./courses/courses')(db);
    var subscriptionsRouter = require('./subscriptions/subscriptions')(db);

    router.use('/seguridad', seguridadRouter);
    router.use('/courses', coursesRouter);
    router.use('/subscriptions', subscriptionsRouter);

    var jwtAuthMiddleware = passport.authenticate('jwt',{session:false});

 return router;
}
//module.exports = router;
module.exports = initApi;

