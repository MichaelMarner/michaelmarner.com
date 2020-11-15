import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostInList } from "../components/post-in-list"

const CategoryList = ({ pageContext: { category }, data, location }) => {
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
    </Layout>
  )
}

export const query = graphql`
  query CategoryListQuery($ids: [String]!) {
    allMarkdownRemark(
      filter: { id: { in: $ids } }
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
        }
      }
    }
  }
`

export default CategoryList
