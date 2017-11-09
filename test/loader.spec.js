/* eslint-env jest */
/* eslint-disable no-useless-escape */
const loader = require('../lib/loader.js')

const input = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <rect x="9" y="1" width="1" height="17"></rect>
  <rect x="1" y="9" width="17" height="1"></rect>
</svg>`

const expectedOutput = `module.exports = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props
    var ratio = props.ratio || 1
    var width = props.width || 20
    var height = props.height || 20
    var viewBox = props.viewBox || '0 0 20 20'

    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-name ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x=\"9\" y=\"1\" width=\"1\" height=\"17\"></rect><rect x=\"1\" y=\"9\" width=\"17\" height=\"1\"></rect>'
      }
    })
  }
}`

test('gets SVG file and outputs Vue functional component', async () => {
  const output = loader.call({
    resourcePath: 'name.svg'
  }, input)

  expect(output.trim()).toBe(expectedOutput)
})
