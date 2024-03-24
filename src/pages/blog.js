import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import { getI18nContent, getSimplifiedPosts } from '../utils/helper'

const Blog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(edges), [edges])
  return (
    <Layout>
      <BlogList data={simplifiedPosts} showYears />
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { category: { eq: "post" }, locale: { eq: $language } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`

export default Blog

export const Head = ({ data }) => {
  const title = getI18nContent(data, 'nav-blog')
  return <SEO title={title} />
}
