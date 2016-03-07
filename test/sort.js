var tape = require('tape')

var inputs = [
  [0],
  [0,0,1],
  [0,1],
  [1],
  [1,1],
  [1,2],
  [1,2,1],
  [2],
  [2,1,1],
  [3],
  [Number.MAX_SAFE_INTEGER]
]

var between = require('../numbers')

tape('number lists sort correctly', function (t) {
  t.deepEqual(inputs.slice().reverse().sort(between.compare), inputs)
  t.end()
})

tape('pairwise compare', function (t) {
  console.log(inputs)
  for(var i in inputs)
    for(var j in inputs) {
      var act = between.compare(inputs[i], inputs[j])
      var exp = (i-j)/Math.abs(i-j) || 0
      console.log("TEST", JSON.stringify([inputs[i], inputs[j]]), act, exp)
      t.equal(act, exp)
    }
  t.end()
})


function test (lo, hi) {
  var LO = JSON.stringify(lo), HI = JSON.stringify(hi)

  tape(LO + ' < between('+LO+', '+HI+') < '+HI, function (t) {
    console.log(lo, hi, between.compare(lo, hi))
    var mid = between(lo, hi)
    console.log('MID', mid)
    t.equal(between.compare(lo, mid), -1)
    t.equal(between.compare(mid, hi), -1)
    t.equal(between.compare(hi, mid), 1)
    t.equal(between.compare(mid, lo), 1)
    t.end()
  })

}

test([1], [2])
test([1], [3])
test([5, 1], [5, 2])
test([5, 1, 0, 1], [5, 1, 0, 2])
test([1], [1, 2])
test([1,2,3], [4])

for(var i = 0; i < inputs.length; i++)
  for(var j = i+1; j < inputs.length; j++)
    test(inputs[i], inputs[j])



