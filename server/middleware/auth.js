const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  let cookie = req.cookies;
  console.log(req);

  if (cookie && Object.keys(cookie).length) {
    console.log('IF COOKIE EXISTS: REQ ', req);
    req.session = {
      hash: cookie
    }
    next();
    // verify cookie === session.hash
    //   if exists
    //     assign username & userId property to req.session
  } else {
    console.log('IF COOKIE DOESNT EXIST: REQ ', req);
    models.Sessions.create()
    .then((results) => {
      return models.Sessions.get({id: results.insertId})
    })
    .then((session) => {
      let sessionHash = { value: session.hash }
      res.cookies = {shortlyid: sessionHash};
      req.session = session;
      req.session.user = {username: req.body.username}
      next();
    })
  }





  //
  // models.Sessions.create().then(function(results) {
  //   let sessionId = results.insertId;
  //   res.writeHead(200, {cookie: results});
  //   models.Sessions.get({id: sessionId}).then(function(result) {
  //     console.log('hash get results', result);
  //   });
  // })


};
// check the cookie does exist or not:
  // if exist, get the parsed cookie
    // grab the user info based on the cookie,
    // and set to session
  // if not, create a new session in the db
/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
