var between = require('./numbers')
var base = 36
function stringify(a) {
  return Array.isArray(a) ? a.map(function (e) {
    return e.toString(base)
  }).join(',') : a
}

function parse(a) {
  return a.split(',').map(function (n) {
    return parseInt(n, base)
  })
}

module.exports = function (lo, hi) {
  return stringify(between(parse(lo),parse(hi)))
}

module.exports.lo = stringify([0])
module.exports.hi = stringify([Number.MAX_SAFE_INTEGER])

