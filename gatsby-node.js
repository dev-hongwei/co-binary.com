exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.frontmatter) {
    createNodeField({
      node,
      name: 'locale',
      value: node.fileAbsolutePath.substr(-5, 2),
    })
  }
}
