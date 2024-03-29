import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostInList } from "../components/post-in-list"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const menuItems = data.menuItems.nodes
  const socials = data.socials
  const categories = data.categories.group.map(item => item.fieldValue)

  if (posts.length === 0) {
    return (
      <Layout
        location={location}
        title={siteTitle}
        menuItems={menuItems}
        socials={socials}
        categories={categories}
      >
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      location={location}
      title={siteTitle}
      menuItems={menuItems}
      socials={socials}
      categories={categories}
    >
      <SEO title="All posts" />
      {posts.map(post => {
        return PostInList((post = { post }))
      })}

      <nav
        className="navigation pagination"
        role="navigation"
        aria-label="Posts"
      >
        <h2 className="screen-reader-text">Posts navigation</h2>
        <div className="nav-links">
          {pageContext.currentPage === 1 && (
            <a className="prev page-numbers" href="/">
              Previous page
            </a>
          )}
          {pageContext.currentPage > 1 && (
            <a
              className="prev page-numbers"
              href={`/page/${pageContext.currentPage - 1}`}
            >
              Previous page
            </a>
          )}

          {pageContext.currentPage < pageContext.numPages - 1 && (
            <a
              className="next page-numbers"
              href={`/page/${pageContext.currentPage + 1}`}
            >
              Next page
            </a>
          )}
        </div>
      </nav>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
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
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { frontmatter: { type: { eq: "post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        html
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          categories
          tags
          featured_image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
