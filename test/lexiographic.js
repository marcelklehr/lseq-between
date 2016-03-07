

//test encoding positive integers lexiographically
var tape = require('tape')
var lex = require('../')

var ints = []
for(var i = 0; i < 100; i++)
  ints.push(i)

tape('integers convert forward and backward', function (t) {
  t.deepEqual(ints.map(lex.stringify).map(lex.parse), ints)
  t.end()
})

tape('sorted lexiographically', function (t) {
  t.deepEqual(
    ints
      .map(lex.stringify)
      .reverse()
      .sort()
      .map(lex.parse),
    ints
  )
  t.end()
})

tape('stringify array', function (t) {
  var ary = [1,3,234,23]
  t.deepEqual(
    lex.array.parse(lex.array.stringify(ary)),
    ary
  )
  t.deepEqual(
    lex.array.parse(lex.array.stringify(ints)),
    ints
  )
  t.end()

})

