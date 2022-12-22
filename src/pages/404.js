import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const menuItems = data.menuItems.nodes
  const socials = data.socials
  const categories = data.categories.group.map(item => item.fieldValue)

  return (
    <Layout
      location={location}
      title={siteTitle}
      menuItems={menuItems}
      socials={socials}
      categories={categories}
    >
      <SEO title="404: Not Found" />

      <section className="error-404 not-found">
        <header className="page-header">
          <h1 className="page-title">Oops! That page can’t be found.</h1>
          <p>If you think this is a mistake maybe try contacting me.</p>
        </header>
      </section>
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
    menuItems: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "page" } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
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

    categories: allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      limit: 2000
    ) {
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
          mastodon
        }
      }
    }
  }
`
