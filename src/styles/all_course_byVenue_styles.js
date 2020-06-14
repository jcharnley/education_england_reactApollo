import styled from 'styled-components';

export const SubNav = styled.div`
	display: flex;
	justify-content: space-around;
	padding-bottom: 1rem;
`;

export const ResultTotal = styled.div`
	font-weight: 300;
	font-size: 1.025rem;
	margin-bottom: 1.25rem;
	text-align: center;
`;
export const CourseListContainer = styled.div`
	background-color: rgba(255, 255, 255, 0.1);
	margin: 1.25rem 0.25rem;
	box-sizing: border-box;
	border-radius: 0px 20px 0px 0px;
	border: 2px solid lightgrey;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 10px 0px,
		rgba(0, 0, 0, 0.1) 0px 2px 20px 0px;
`;
export const CourseItemContainer = styled.div`
	margin: 0rem 0.25rem;
	box-sizing: border-box;
`;

export const AddressContainer = styled.div`
	margin: 1.25rem 0.25rem;
	box-sizing: border-box;
`;

export const CombinedDetails = styled.div`
	background-color: rgba(255, 255, 255, 0.1);
	margin: 1.25rem 0.25rem;
	box-sizing: border-box;
	border-radius: 0px 20px 20px 0px;
	border: 2px solid lightgrey;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 10px 0px,
		rgba(0, 0, 0, 0.1) 0px 2px 20px 0px;
	padding: 1rem;
`;
export const CourseItemProvider = styled.article`
	padding: 1rem;
	max-width: 70%;
	box-sizing: border-box;
`;

export const H4 = styled.h4``;
export const H5 = styled.h5`
	color: rgb(255, 255, 255);
`;
export const H6 = styled.h6`
	color: rgb(51, 51, 51);
`;

export const CourseInfoContainer = styled.article`
	border-top: 1px solid white;
	border-bottom: 1px solid white;
	&:first-of-type {
		border-top: 2px solid white;
	}
	&:last-of-type {
		border-bottom: 2px solid white;
	}
`;

export const CourseItem = styled.div`
	padding: 1rem;
	background: linear-gradient(
		90deg,
		rgba(58, 50, 184, 1) 5%,
		rgba(7, 98, 190, 1) 77%
	);
	opacity: 0.881988;
	background-color: rgb(0, 33, 153);
	transition: all 0.35s ease-out 0s;
`;
export const CourseInfo = styled.article`
	display: flex;
	justify-content: space-between;
	.subinfo {
		color: rgba(255, 255, 255, 0.5);
	}
`;
export const DisplayAll = styled.div`
	padding: 1rem;
`;
export const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 35vh;
`;
