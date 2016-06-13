function last (ary) {
  return ary[ary.length-1]
}

module.exports = function (lo, hi) {

  if(compare(lo, hi) >= 0)
    throw new Error('numarray-between: lo must be smaller than hi, was:' +
      JSON.stringify(lo) + ', ' + JSON.stringify(hi))
  
  var i, mid=[], base=36

  // find common prefix
  for(i=0; i<lo.length && i<hi.length; i++) {
    if (lo[i] != hi[i]) break;
    mid.push(lo[i])
    base = Math.min(base*2,Number.MAX_SAFE_INTEGER) // double base for every level in identifier tree
  }

  var _lo = lo[i], _hi = hi[i]

  if (!_lo) _lo = 0
  if ('undefined' === _hi) _hi = base
  
  while (_lo == base || _lo+1 >= _hi) {
    // _lo is last possible value in base -> new level in tree
    // or
    // _lo and _hi are adjacent or equal -> new level in tree
    mid.push(_lo)
    base = Math.min(base*2,Number.MAX_SAFE_INTEGER)
    i++
    _lo = lo[i] || 0
    _hi = 'undefined' !== typeof hi[i]? hi[i] : base
  }

  var strategy = Math.round(Math.random())
  if (_lo || strategy) {
    // strategy:append
    mid.push(_lo+1)
  }else {
    mid.push(_hi-1)
  }
 
  if (compare(lo, mid) < 0 && compare(mid, hi) < 0 && mid[mid.length-1] != 0)
    return mid
  
  throw new Error('ERR_PEBKAC: Developer messed up')
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






