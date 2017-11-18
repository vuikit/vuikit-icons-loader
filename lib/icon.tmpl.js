module.exports = `{
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props
    var ratio = props.ratio || 1
    var width = props.width || #{width}
    var height = props.height || #{height}
    var viewBox = props.viewBox || '0 0 #{width} #{height}'

    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-#{name} ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '#{data}'
      }
    })
  }
}`
