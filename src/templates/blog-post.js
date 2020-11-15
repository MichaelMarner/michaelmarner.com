import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Post} from '../components/post';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const menuItems= data.menuItems.nodes
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle} menuItems={menuItems}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Post post={post} />
      <nav
        className="navigation post-navigation"
        role="navigation"
        aria-label="Posts"
      >
        <h2 className="screen-reader-text">Post navigation</h2>
        <div className="nav-links">
          {previous && (<div className="nav-previous">
        {previous.frontmatter.featured_image?.childImageSharp?.fluid && (
          <div className="nav-background">
            <Img fluid={previous.frontmatter.featured_image?.childImageSharp?.fluid} />
          </div>
        )}
              <Link to={previous.fields.slug} rel="prev">
              <span className="meta-nav" aria-hidden="true">
                Previous
              </span>{" "}
              <span className="screen-reader-text">Previous post:</span>{" "}
              <span className="post-title">
                {previous.frontmatter.title}
              </span>
              </Link>
          </div>
)}
          {next && (<div className="nav-next">
          <div className="nav-background">
        {next.frontmatter.featured_image?.childImageSharp?.fluid && (
          <div className="nav-background">
            <Img fluid={next.frontmatter.featured_image?.childImageSharp?.fluid} />
          </div>
        )}
          </div>
              <Link to={next.fields.slug} rel="prev">
              <span className="meta-nav" aria-hidden="true">
                Next
              </span>{" "}
              
              <span className="screen-reader-text">Next post:</span>{" "}
              <span className="post-title">
                {next.frontmatter.title}
              </span>
            </Link>
          </div>)}
        </div>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
  }
`
