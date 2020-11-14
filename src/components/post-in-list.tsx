import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

export const PostInList = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  let featuredImgFluid = post.frontmatter.featured_image?.childImageSharp?.fluid

  return (
    <article
      id={post.id}
      className="post-943 post type-post status-publish format-standard has-post-thumbnail hentry category-programming tag-dart tag-flutter tag-redux tag-remote-devtools"
    >
      {featuredImgFluid && (
        <div className="post-thumbnail">
          <Img fluid={featuredImgFluid} />
        </div>
      )}
      <header className="entry-header">
        <h1 className="entry-title">
          <Link to={post.fields.slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h1>

        <small>{post.frontmatter.date}</small>
      </header>
      <div className="entry-content">
        <section
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
          itemProp="articleBody"
        />
      </div>
    </article>
  )
}
