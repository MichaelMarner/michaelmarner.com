import React from "react"
import {  graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostInList } from '../components/post-in-list'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const menuItems= data.menuItems.nodes
  const socials = data.socials;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
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
    <Layout location={location} title={siteTitle} menuItems={menuItems} socials={socials}>
      <SEO title="All posts" />
        {posts.map(post => {
          return (
            PostInList(post={post})
          )
        })}
    </Layout>
  )
}

export default BlogIndex

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
    allMarkdownRemark(filter: {frontmatter: {type: {ne: "page"}}} sort: { fields: [frontmatter___date], order: DESC }) {
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
