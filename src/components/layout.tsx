import React from "react"
import { Sidebar } from "./sidebar"

const Layout = ({
  location,
  title,
  children,
  menuItems,
  categories,
  socials,
}) => {
  return (
    <div id="page" className="hfeed site">
      <Sidebar
        menuItems={menuItems}
        socials={socials.siteMetadata.social}
        categories={categories}
      />
      <div id="content" className="site-content">
        <div id="primary" className="content-area">
          <main id="main" className="site-main" role="main">
            {children}
          </main>
        </div>
      </div>
      <footer className="site-footer">
        <div className="site-info">
          © {new Date().getFullYear()} Michael Marner{" "}
        </div>
      </footer>
    </div>
  )
}

export default Layout
