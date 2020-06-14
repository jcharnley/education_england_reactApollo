import * as React from 'react';
import Navbar from './navbar'
import {LayoutContainer} from '../styles/layout_styles'
// import Footer from './footer.js'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <LayoutContainer>
    <Navbar>
    </Navbar>
    <div style={{ flexGrow: 2 }}>
      <main>{children}</main>
    </div>
    {/* <Footer /> */}
    </LayoutContainer>
  )
}

export default Layout
