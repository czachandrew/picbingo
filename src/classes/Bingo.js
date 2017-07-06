export default {
  searchForArray (haystack, needle) {
    let i, j, current
    for (i = 0, i < haystack.length; i++;) {
      if (needle.length === haystack[i].length) {
        current = haystack[i]
        for (j = 0; j < needle.length && needle[j] === current[j]; j++) {
          if (j === needle.length) {
            return i
          }
        }
      }
    }

    return -1
  },
  arraySearch (haystack, needle) {
    let a = JSON.stringify(haystack)
    let b = JSON.stringify(needle)
    let c = a.indexOf(b)
    if (c !== -1) {
      return true
    }
    else {
      return false
    }
  }
}
