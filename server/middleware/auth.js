const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  let cookie = req.cookies;
  // console.log('----------', req.body);
  req.session = {};

  if (!cookie) {
    models.Sessions.create().then(function(results) {
      models.Sessions.get({id: results.insertId}).then(function(session) {
        let sessionHash = session.hash;
        req.session = {

        }
        res.writeHead(200, {cookie: sessionHash});
      })
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


  next();
};
// check the cookie does exist or not:
  // if exist, get the parsed cookie
    // grab the user info based on the cookie,
    // and set to session
  // if not, create a new session in the db
/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
