import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';
import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import { CourseListContainer, AddressContainer, CourseItemContainer, CombinedDetails, H4, H5, H6, CourseInfoContainer, CourseItem, CourseInfo, SubNav, ResultTotal, LoadingContainer } from '../styles/all_course_byVenue_styles'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';

const GET_ALL_COURSESBYID = gql`
   query AllCoursesById($venueId: BigInt!) {
    cVenueByVenueId(venueId: $venueId) {
    venueName
    venueId
    website
    phone
    email
    address1
    address2
    cProviderByProviderId {
      providerName
      town
      website
      postcode
      phone
      email
      combinedCoursesByProviderId {
        nodes {
          providerCourseTitle
          courseQualLvl
          courseId
          indepLivingSkills
          sSkillsForLife
          sSsaTier1Desc
          sEntrySubLevelDesc
          sSsaTier2Desc
        }
        totalCount
      }
    }
  }
  }
`;

interface CourseListProps {

}
const AllCoursesByVenue: React.FunctionComponent<CourseListProps> = () => {
  let history = useHistory();
  let queryParmeterSplit: string[] = history.location.pathname.split('/');
  let venueIdProp: string = queryParmeterSplit[3];
  const { loading, error, data } = useQuery(GET_ALL_COURSESBYID, {
    variables: {
      venueId: venueIdProp
    }
  });

  if (loading) return <Layout><LoadingContainer><CircularProgress /></LoadingContainer></Layout>;
  if (error) return <Layout><LoadingContainer><Alert severity="error">
    Error please retry!
      </Alert> </LoadingContainer></Layout>;

  let venue = data.cVenueByVenueId;
  let currentVenueId: string = venue.venueId;

  let provider: any = venue.cProviderByProviderId;
  let courses: any = provider.combinedCoursesByProviderId
  let courseTotal: number = courses.totalCount;

  return (
    <Layout>
      <SEO title={"All courses by venue"} description={"List of all courses available by venue"} />
      <Header pageTitle={"Courses by Venue"}></Header>
      <SubNav>
        <Button variant="outlined" onClick={(): void => history.goBack()}>Back</Button>
        <Button variant="outlined" onClick={(): void => {
          // toggleFilterMenu()
        }} color="primary">
          Filters
            </Button>
      </SubNav>
      <ResultTotal>{courseTotal} courses
            </ResultTotal>
      <CourseListContainer>
        <AddressContainer>
          <CombinedDetails>
            <h6 style={{ textDecoration: 'underline' }}>Venue</h6>
            <H4>{venue.venueName}</H4>
            <H6>{venue.address1}, {venue.address2}</H6>
            <H6>{venue.website}</H6>
            <H6>{venue.email}</H6>
            <H6>{venue.phone}</H6>
          </CombinedDetails>
          <CombinedDetails>
            <h6 style={{ textDecoration: 'underline' }}>Provider</h6>
            <H4>{provider.providerName}</H4>
            <H6>{provider.town}, {provider.postcode}</H6>
            <H6>{provider.website}</H6>
            <H6>{provider.email}</H6>
            <H6>{provider.phone}</H6>
          </CombinedDetails>
        </AddressContainer>
        <div>
          {courses && courses.nodes.map((results: any, key: number) => {

            return (
              <CourseItemContainer key={key}>
                <CourseInfoContainer>
                  <CourseItem
                    onClick={(): void => {
                      history.push(`/course_list/course/${results.courseId}/${currentVenueId}`);
                    }}
                  >
                    <H5>{results.providerCourseTitle}</H5>
                    <CourseInfo>
                      <H6 className='subinfo'>Level {results.courseQualLvl}</H6>
                    </CourseInfo>
                  </CourseItem>
                </CourseInfoContainer>
              </CourseItemContainer>
            )
          })}
        </div>
      </CourseListContainer>
    </Layout>
  );
}

export default AllCoursesByVenue

