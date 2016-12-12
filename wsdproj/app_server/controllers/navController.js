/**
 * Created by daeyoung on 2016-12-12.
 */
var util = require('../utils/util');

module.exports.getAboutPage = function (req, res) {
  var user = util.getSessionUser(req);
  res.render('about',{user:user});
};