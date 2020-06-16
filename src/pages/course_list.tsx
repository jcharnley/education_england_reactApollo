import * as React from 'react';
import { useEffect } from "react"
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';
import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
// import Filters from '../components/filters'
import { CourseItemContainer, CourseItemProvider, H4, H5, H6, CourseInfoContainer, CourseItem, CourseInfo, DisplayAll, SubNav, ResultTotal, LoadingContainer } from '../styles/course_list_styles'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';


const GET_VEUNES = gql`
   query ($lng: Float,$lat: Float, $radius: Float, $after: Cursor){
 closeTo(lng: $lng, lat:$lat, radius: $radius, first: 3, after: $after) {
    nodes {
      venueName
      venueId
      website
      town
      cProviderByProviderId {
        providerName
        town
        website
        town
        combinedCoursesByProviderId {
          nodes {
            courseQualLvl
            providerCourseTitle
            courseId
            indepLivingSkills
            sSkillsForLife
            sSsaTier1Desc
            sEntrySubLevelDesc
          }
          totalCount
        }
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
 }
}
`;


interface CourseListProps {

}
const CourseList: React.FunctionComponent<CourseListProps> = () => {
    let history = useHistory();
    let queryParmeterSplit: string[] = history.location.pathname.split('/');
    let lat: number = parseFloat(queryParmeterSplit[2]);
    let lng: number = parseFloat(queryParmeterSplit[3]);
    let currentDistance: number = parseFloat(queryParmeterSplit[4]);


    const { loading, error, data, fetchMore } = useQuery(GET_VEUNES, {
        variables: {
            lat: lat,
            lng: lng,
            radius: currentDistance,
            after: null
        }
    });

    useEffect(() => {
        return () => {
        }
    }, [currentDistance]);

    // refetch

    // const [isFiltersOpen, setViewFilters] = useState<boolean>(false)
    // const toggleFilterMenu = (): void => {
    //     setViewFilters(!isFiltersOpen);
    // }


    if (loading) return <Layout><LoadingContainer><CircularProgress /></LoadingContainer></Layout>;
    if (error) return <Layout><LoadingContainer><Alert severity="error">
        Error please retry!
        </Alert> </LoadingContainer></Layout>;


    const results: any = data.closeTo;
    const providerTotalCount: number = results.totalCount;
    let courseTotalCount = results.nodes.map((courses: any): number => {
        let sum = 0;
        sum = courses.cProviderByProviderId.combinedCoursesByProviderId.totalCount;
        return sum
    }).reduce((sum: number, total: number): number => {
        return sum + total;
    }, 0);

    return (
        <Layout>
            {/* {!isFiltersOpen ? null : <Filters isFiltersOpen={isFiltersOpen} refetch={refetch}></Filters>} */}
            <SEO title={"COURSES"} description={"Number of courses by provider"} />
            <Header pageTitle={"Courses near you"}></Header>
            <SubNav>
                <Button variant="outlined" onClick={(): void => history.goBack()}>Back</Button>
                <Button variant="outlined" onClick={() => {
                    // toggleFilterMenu()
                }} color="primary">
                    Filters
            </Button>
            </SubNav>
            <ResultTotal>{courseTotalCount} courses by {providerTotalCount} providers
            </ResultTotal>
            {results.nodes && results.nodes.map((listItem: any, key: number): JSX.Element => {

                const venueId: string = listItem.venueId;
                const venueName: string = listItem.venueName;
                const providerCourseTotal: number = listItem.cProviderByProviderId.combinedCoursesByProviderId.totalCount;
                return (
                    <CourseItemContainer key={key}>
                        <CourseItemProvider>
                            <H4>{venueName}</H4>
                            <H6>{listItem.town}</H6>
                            <a href={listItem.website}>{listItem.website}</a>
                            <H6>{listItem.cProviderByProviderId.totalCount}</H6>
                            <div>
                                <H6>Provider : {listItem.cProviderByProviderId.providerName}</H6>
                            </div>
                            <h5 style={{ paddingTop: '0.5rem' }}>{providerCourseTotal} courses</h5>
                        </CourseItemProvider>
                        {listItem.cProviderByProviderId.combinedCoursesByProviderId.nodes.slice(0, 3).map((course: any, key: number): JSX.Element => {
                            // let durationValue = course.oOpportunitiesByCourseId.nodes[0].durationValue;
                            return (
                                <CourseInfoContainer key={key}>
                                    <CourseItem
                                        onClick={(): void => {
                                            history.push(`/course_list/course/${course.courseId}/${venueId}`);
                                        }}
                                    >
                                        <H5>{course.providerCourseTitle}</H5>
                                        <CourseInfo >
                                            <H6 className="subinfo">Level {course.courseQualLvl}</H6>
                                            {/* <H6>Duration {durationValue ? durationValue : 'N/A'}</H6> */}
                                        </CourseInfo>
                                    </CourseItem>
                                </CourseInfoContainer>
                            )
                        })}
                        <DisplayAll
                            onClick={(): void => {
                                history.push(`/venue/courses/${venueId}`);
                            }}
                        >Show all courses</DisplayAll>
                    </CourseItemContainer>
                )

            })}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1.25rem' }}>
                <Button variant="outlined" onClick={(): void => {
                    let endCursor = results.pageInfo.endCursor;
                    fetchMore({
                        variables: {
                            after: endCursor
                        },
                        updateQuery: (prevResult: any, { fetchMoreResult }) => {
                            if (fetchMoreResult.closeTo.pageInfo.hasNextPage === true) {
                                fetchMoreResult.closeTo.nodes = [
                                    ...prevResult.closeTo.nodes,
                                    ...fetchMoreResult.closeTo.nodes
                                ];
                                return fetchMoreResult;
                            } else {
                                return null;
                            }

                        }
                    })
                }} color="primary">
                    Load More
            </Button>
            </div>
        </Layout >
    );
}

export default withRouter(CourseList)
