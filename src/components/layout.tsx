import React from "react"
import { Sidebar } from "./sidebar"

const Layout = ({ location, title, children, menuItems, socials }) => {
  return (
    <div id="page" className="hfeed site">
      <Sidebar menuItems={menuItems} socials={socials.siteMetadata.social} />
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
