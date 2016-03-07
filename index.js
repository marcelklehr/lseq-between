var b58 = require('base58')
var base = 36

function encode(n) {
  return n.toString(base)
//  return b58.encode(n)
}

function decode (s) {
  return parseInt(s, base)
//  return b58.decode(s)
}

function stringify (n) {
  if(n == 0) return encode(n)
  var s = encode(n)
  return encode(s.length) + s
}

function parse (s) {
  var l = decode(s[0])
  if(l === 0) return l
  return decode(s.substring(1, l+1))
}

function arrayParse (s) {
  var a = []
  while(s.length) {
    var n = parse(s)
    a.push(n)
    s = s.substring(stringify(n).length)
  }
  return a
}

function arrayStringify (a) {
  return a.map(stringify).join('')
}

var numbers = require('./numbers')

module.exports = function (lo, hi) {
  return arrayStringify(numbers(arrayParse(lo), arrayParse(hi)))
}

module.exports.parse = parse
module.exports.stringify = stringify
module.exports.array = {parse: arrayParse, stringify: arrayStringify}

module.exports.lo = arrayStringify([0])
module.exports.hi = arrayStringify([Number.MAX_SAFE_INTEGER])





