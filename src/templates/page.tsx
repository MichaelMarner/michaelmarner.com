import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Post } from "../components/post"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
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
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Post post={post} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query PageBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featured_image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featured_image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
