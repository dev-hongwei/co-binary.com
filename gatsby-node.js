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

exports.createPages = async (props) => {
  const { graphql, actions, reporter } = props
  const { createPage } = actions
  const blogTemplate = require.resolve('./src/templates/post.js')

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              date
              slug
            }
            fields {
              locale
              isDefault
            }
          }
        }
      }
    }
  `)

  if (result.errors)
    reporter.panicOnBuild('Error loading MD result', result.errors)
  const all = result.data.allMarkdownRemark.edges
  const postList = all.filter((post) => !!post.node.frontmatter.title)
  postList.forEach((post) => {
    const { slug } = post.node.frontmatter
    const { isDefault } = post.node.fields

    const pageData = {
      path: `${slug}`,
      component: blogTemplate,
      context: {
        slug,
      },
    }
    if (isDefault) createPage(pageData)
  })
}
