function isObject (obj) {
  return typeof obj === 'object' && obj !== null
}

function process (type, obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => process(type, item))
  }

  if (isObject(obj)) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        obj[i] = process(type, obj[i])
      }
    }

    return obj
  }

  if (typeof obj === 'string') {
    return type === 'decode' ? decodeURIComponent(obj) : encodeURIComponent(obj)
  }

  return obj
}

function encode (obj) {
  return process('encode', obj)
}

function decode (obj) {
  if (obj && obj._readableState) {
    return obj
  }

  return process('decode', obj)
}


module.exports = { encode, decode }
