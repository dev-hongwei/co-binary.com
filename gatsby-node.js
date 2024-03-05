const path = require('path')
const { defaultLanguage } = require('./src/common/Languages')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const name = path.basename(node.fileAbsolutePath, '.md')
    const isDefault = name === `index.${defaultLanguage}`
    const lang = isDefault ? defaultLanguage : name.split('.')[1]
    createNodeField({
      node,
      name: 'locale',
      value: lang,
    })
    createNodeField({
      node,
      name: 'isDefault',
      value: isDefault,
    })
  }
}
