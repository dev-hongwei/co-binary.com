import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import { getI18nContent } from '../utils/helper'

const Blogs = ({
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  return (
    <Layout>
      {nodes
        .filter((node) => !!node.frontmatter.title)
        .map((node) => (
          <article key={node.id}>
            <h2>{node.frontmatter.title}</h2>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        ))}
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
