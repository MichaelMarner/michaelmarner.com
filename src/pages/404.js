import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const menuItems= data.menuItems.nodes
  const socials = data.socials;
  const categories = data.categories.group.map(item => item.fieldValue);

  return (
    <Layout location={location} title={siteTitle} menuItems={menuItems} socials={socials} categories={categories}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    menuItems: allMarkdownRemark(filter: {frontmatter: {type: {eq: "page"}}} sort: { fields: [frontmatter___order], order: ASC}) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
        }
    }
  }

  categories:allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}} limit: 2000) {
    group(field: frontmatter___categories) {
      fieldValue
    }
  }

  socials: site {
    siteMetadata {
      social {
        twitter
        github
        email
        linkedin
      }
    }
  }
  }
`
