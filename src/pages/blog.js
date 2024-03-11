import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import { getI18nContent, getSimplifiedPosts } from '../utils/helper'

const Blogs = ({
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(nodes), [nodes])
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
      nodes {
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
`

export default Blogs

export const Head = ({ data }) => {
  const title = getI18nContent(data, 'nav-blog')
  return <SEO title={title} />
}
