
/*
 * GET users listing.
 */

var mongo = require('database');

exports.list = function(req, res){
  mongo.getUsers(function(users) {
    res.render("user", {title: "All Users", user: users});
  });
};
