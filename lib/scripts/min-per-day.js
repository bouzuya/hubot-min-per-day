// Description
//   A Hubot script that returns average time "15 min/d"
//
// Configuration:
//   None
//
// Commands:
//   hubot min/d - average time "15 min/d"
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var request;
  request = require('request-b');
  return robot.respond(/min\/d$/i, function(res) {
    var url;
    url = 'http://blog.bouzuya.net/posts.json';
    return request(url).then(function(r) {
      var json, stats;
      json = JSON.parse(r.body);
      stats = json.reduce(function(s, post) {
        var _ref, _ref1;
        s.sum = ((_ref = s.sum) != null ? _ref : 0) + post.minutes;
        s.count = ((_ref1 = s.count) != null ? _ref1 : 0) + 1;
        return s;
      }, {});
      stats.avg = stats.sum / stats.count;
      return res.send("" + stats.avg + " min/d\n(" + stats.sum + " minutes / " + stats.count + " days)");
    });
  });
};
