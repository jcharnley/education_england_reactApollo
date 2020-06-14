import styled from 'styled-components';

export const Nav = styled.nav`
	background-color: rgb(249, 250, 253);
	width: 100%;
	display: flex;
	justify-content: flex-end;
`;
export const NavContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
export const NavExpander = styled.div`
	padding: 0.75rem;
	//   display: inline-block;
	//   cursor: pointer;
`;

export const Logo = styled.div`
	width: 2.1875rem;
	background-color: #333;
	padding: 1.25rem;
	color: white;
`;

export const Bar1 = styled.div`
	width: 35px;
	height: 0.3125rem;
	background-color: #333;
	margin: 6px 0;
	transition: 0.4s;
	transform: ${(props) =>
		props.isMenuOpen ? 'rotate(-47deg) translate(-9px, 6px)' : null};
	border-radius: 0.5rem;
`;
export const Bar2 = styled.div`
	width: 35px;
	height: 0.3125rem;
	background-color: #333;
	margin: 6px 0;
	transition: 0.4s;
	opacity: ${(props) => (props.isMenuOpen ? '0' : '1')};
	border-radius: 0.5rem;
`;

export const Bar3 = styled.div`
	width: 35px;
	height: 0.3125rem;
	background-color: #333;
	margin: 6px 0;
	transition: 0.4s;
	transform: ${(props) =>
		props.isMenuOpen ? 'rotate(45deg) translate(-8px, -8px)' : null};
	border-radius: 0.5rem;
`;
