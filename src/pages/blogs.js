import React from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import { getI18nContent } from '../utils/helper'

const Blogs = ({
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  const blogPathfilter = `/content/${useI18next().language}/blog`
  console.log(nodes)
  const validNodes = nodes.filter(
    (node) =>
      !!node.frontmatter.title &&
      node.fileAbsolutePath.includes(blogPathfilter),
  )
  return (
    <Layout>
      <BlogList data={validNodes} />
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
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
  }
`

export default Blogs

export const Head = ({ data }) => {
  const title = getI18nContent(data, 'nav-blogs')
  return <SEO title={title} />
}
