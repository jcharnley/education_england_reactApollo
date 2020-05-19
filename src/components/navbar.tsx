import * as React from 'react';
import { useState } from "react"

interface WelcomeProps {
 name: string,
}
const Navbar: React.SFC<WelcomeProps> = (props) => {
    const [isMenuOpen, setViewMenu] = useState(false)

  const toggleMenu = () => {
    setViewMenu(!isMenuOpen)
  }
 return <nav>
     <h1>this is the navbar</h1>
 </nav>;
}

export default Navbar
