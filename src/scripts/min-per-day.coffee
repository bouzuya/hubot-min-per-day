# Description
#   A Hubot script that average time "15 min/d"
#
# Configuration:
#   None
#
# Commands:
#   hubot min/d - average time "15 min/d"
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'

  robot.respond /min\/d$/i, (res) ->
    url = 'http://blog.bouzuya.net/posts.json'
    request(url).then (r) ->
      json = JSON.parse r.body
      stats = json.reduce (s, post) ->
        s.sum = (s.sum ? 0) + post.minutes
        s.count = (s.count ? 0) + 1
        s
      , {}
      stats.avg = stats.sum / stats.count
      res.send """
        #{stats.avg} min/d
        (#{stats.sum} minutes / #{stats.count} days)
      """
