import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

export const Post = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  let featuredImgFluid = post.frontmatter.featured_image?.childImageSharp?.fluid
  let tags = post.frontmatter.tags || []
  let categories = post.frontmatter.categories || []
  let postClasses = featuredImgFluid
    ? "post type-post status-publish format-standard hentry has-post-thumbnail"
    : "post type-post status-publish format-standard hentry"
  return (
    <div>
      <article id={post.id} className={postClasses}>
        {featuredImgFluid && (
          <div className="post-thumbnail">
            <Img fluid={ {...featuredImgFluid, aspectRatio: 6/4} } />
          </div>
        )}
        <header className="entry-header">
          <h1 className="entry-title">
            <span itemProp="headline">{title}</span>
          </h1>
        </header>
        <div className="entry-content">
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </div>
        <footer className="entry-footer">
          <span className="posted-on">
            <span className="screen-reader-text">Posted on </span>
            {post.frontmatter.date}
          </span>
        <span className="cat-links">{categories.map( (category, index) => {
          return (
            <span>
            <Link to={`/category/${category.toLowerCase().replace(/ /g, '-')}`}>{category}</Link>{ index < post.frontmatter.categories.length-1 &&  ", "}
            </span>
          );
        })}</span>
          <span className="tags-links">
            <span className="screen-reader-text">Tags: </span>
            {tags.join(", ")}
          </span>
        </footer>
      </article>
    </div>
  )
}
