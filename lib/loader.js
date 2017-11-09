const path = require('path')
const defaultTmpl = require('./icon.tmpl.js')

module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable()
  }

  const filePath = this.resourcePath
  const fileName = path.basename(filePath, path.extname(filePath))

  return 'module.exports = ' + convert(content, defaultTmpl, fileName)
}

function convert (svg, tmpl, name) {
  // get main attributes
  const width = getAttr('width', svg)
  const height = getAttr('height', svg)
  const viewBox = getAttr('viewBox', svg)

  // get data
  const data = svg
    // remove all new lines and white spaces
    .toString().trim().replace(/\n/g, '').replace(/>\s+</g, '><')
    // remove svg tag wrapper
    .replace(/<svg[^>]+>/gi, '').replace(/<\/svg>/gi, '')

  // compile into provided template
  return compileTmpl(tmpl, {
    name,
    data,
    width: parseFloat(width) || 20,
    height: parseFloat(height) || 20,
    viewBox: viewBox || `0 0 ${width} ${height}`
  })
}

function compileTmpl (content, data) {
  return content.replace(/#{(\w+)}/gi, function (match, name) {
    return data[name] ? data[name] : ''
  })
}

function getAttr (name, svg) {
  const rx = new RegExp(`${name}="([\\d\\s]+)"`)
  const match = svg.match(rx)

  return (match && match[1]) || match
}
