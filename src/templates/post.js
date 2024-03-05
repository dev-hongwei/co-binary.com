import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import { getI18nContent } from '../utils/helper'

const Post = ({ data }) => {
  const post = data.markdownRemark
  const { title } = post.frontmatter
  return (
    <Layout>
      <p>{title}</p>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!, $slug: String!) {
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
      frontmatter: { slug: { eq: $slug } }
      fields: { locale: { eq: $language } }
    ) {
      id
      fileAbsolutePath
      excerpt(pruneLength: 250)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`

export default Post

export const Head = ({ data }) => {
  const title = getI18nContent(data, 'nav-blog')
  return <SEO title={title} />
}
