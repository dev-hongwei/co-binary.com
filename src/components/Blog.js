import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'

const Blog = ({ node }) => {
  return (
    <Link to={node.fields.slug} key={node.id} className="post">
      <h3>{node.frontmatter.title}</h3>
      <time>{node.frontmatter.date}</time>
    </Link>
  )
}

export default Blog
