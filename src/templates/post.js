import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'

const Post = ({ data }) => {
  const post = data.markdownRemark
  const { title } = post.frontmatter
  return (
    <Layout>
      <h2>{title}</h2>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query ($category: String!, $slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    markdownRemark(
      fields: {
        category: { eq: $category }
        slug: { eq: $slug }
        locale: { eq: $language }
      }
    ) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`

export default Post

export const Head = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter
  return <SEO title={title} />
}
