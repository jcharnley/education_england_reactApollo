import * as React from 'react';
import { useState } from "react"
import { Bar1, Bar2, Bar3, Nav, NavContainer, NavExpander } from '../styles/navbar_styles'

interface NavProps {

}
const Navbar: React.FunctionComponent<NavProps> = () => {
  const [isMenuOpen, setViewMenu] = useState<boolean>(false);

  const toggleMenu = () : void => {
    setViewMenu(!isMenuOpen);
  }

  return <Nav className="navbar_container">
    <NavContainer>
      <NavExpander onClick={toggleMenu}>
        <Bar1 isMenuOpen={isMenuOpen} ></Bar1>
        <Bar2 isMenuOpen={isMenuOpen} ></Bar2>
        <Bar3 isMenuOpen={isMenuOpen} ></Bar3>
      </NavExpander>
    </NavContainer>
  </Nav>;
}

export default Navbar
