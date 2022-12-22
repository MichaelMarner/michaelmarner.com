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
  const cat = data.category.edges[0]?.node

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
      <SEO title={`${category} archive`} />
      <header className="page-header">
        <h1 className="page-title">{category}</h1>
        <p />
        {cat && <p dangerouslySetInnerHTML={{ __html: cat.html }}></p>}
      </header>

      {posts.map(post => {
        return PostInList((post = { post }))
      })}
    </Layout>
  )
}

export const query = graphql`
  query CategoryListQuery($ids: [String]!, $category: String!) {
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

    category: allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "category" }, title: { eq: $category } }
      }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            slug
          }
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
          mastodon
        }
      }
    }
  }
`

export default CategoryList
