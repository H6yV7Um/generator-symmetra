'use strict'

function isObject (value) {
  return value === Object(value)
}

function isArray (value) {
  return Array.isArray(value)
}

function isFile (value) {
  return value instanceof File
}

function isInvalid (value) {
  return undefined === value || null === value || '' === value;
}

function objectToFormData (obj, fd, pre) {
  fd = fd || new FormData()

  Object.keys(obj).forEach(function (prop) {
    var key = pre ? (pre + '[' + prop + ']') : prop

    if(isInvalid(obj[prop])){
      return;
    }

    if (isObject(obj[prop]) && !isArray(obj[prop]) && !isFile(obj[prop])) {
      objectToFormData(obj[prop], fd, key)
    } else if (isArray(obj[prop])) {
      obj[prop].forEach(function (value) {
        var arrayKey = key

        if (isObject(value) && !isFile(value)) {
          objectToFormData(value, fd, arrayKey)
        } else {
          fd.append(arrayKey, value)
        }
      })
    } else {
      fd.append(key, obj[prop])
    }
  })

  return fd
}

module.exports = objectToFormData
