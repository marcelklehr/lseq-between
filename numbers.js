function last (ary) {
  return ary[ary.length-1]
}

module.exports = function (lo, hi) {

  if(compare(lo, hi) >= 0)
    throw new Error('numarray-between: lo must be smaller than hi, was:' +
      JSON.stringify(lo) + ', ' + JSON.stringify(hi))
  var mid = lo.slice()
  if(lo.length == hi.length) {
    if(last(lo) + 1 == last(hi)) //between([1], [2]) => [1, 1]
      mid.push(1)

//was experimenting with "leaving space"
//for other
    else if(last(mid) + 10 < last(hi))
      mid[mid.length-1] += 5
    else
      mid[mid.length-1] ++
  }
  else if(lo.length > hi.length)
    mid[mid.length-1] += 5
  else if(lo.length < hi.length) {
    if(last(lo) === hi[lo.length-1]) {
      for(var i = lo.length; i < hi.length; i++) {
        mid.push(0)
      }
      mid.push(1)
    }
    else mid[mid.length-1]++
  }
  return mid
}

function compareNums (a, b) {
  return a === b ? 0 : a < b ? -1 : 1
}

var compare = module.exports.compare = function (a, b) {
  var l = Math.min(a.length, b.length)
  for(var i = 0; i < l; i++)
    if(a[i] != b[i])
     return compareNums(a[i], b[i])
  return compareNums(a.length, b.length)
}






