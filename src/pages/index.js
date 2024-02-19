import * as React from "react"
import { graphql } from "gatsby"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../components/layout"

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <p><Trans>This is the home page</Trans></p>
      <p>{t('message')}</p>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => <title>Home Page</title>

