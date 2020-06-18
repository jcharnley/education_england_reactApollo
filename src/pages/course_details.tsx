import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Header from '../components/header';
import { SubNav } from '../styles/course_details_styles';
import Button from '@material-ui/core/Button';
import { CourseContainer, H2, H3, H5, Paragraph, TH, LoadingContainer } from '../styles/course_details_styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';

const GET_COURSE_DETAILS = gql`
   query CourseHeader ($id: BigInt!) {
  combinedCourseByCourseId(courseId: $id) {
    courseId
    providerCourseTitle
    courseSummary
    courseQualType
    courseQualTitle
    courseQualLvl
    courseUrl
    qualificationTitle
    qualificationType
    qualificationLevel
    assessmentMethod
    sSsaTier1Desc
    sSsaTier2Desc
    entryRequirements
    equipmentRequired
    sEntrySubLevelDesc
    sSkillsForLife
    skllsFundngApprvStatDesc
    status
    ucasTariff
    sAwardingBodyName
    qualRefAuthority
    awardingOrgName
    oOpportunitiesByCourseId {
      nodes {
        courseId
        applyFrom
        applyThroughoutYear
        applyTo
        applyUntil
        dfeFunded
        durationDescription
        durationValue
        startDateDescription
        endDate
        timetable
        enquireTo
        languageOfAssessment
        languageOfInstruction
        opportunitySummary
        price
        priceDescription
        status
        studyMode
        venueId
      }
    }
  }
}
`;


interface CourseListProps {
}
const CourseDetails: React.FunctionComponent<CourseListProps> = () => {
    let history = useHistory();
    let queryParmeterSplit : string[] = history.location.pathname.split('/');
    // console.log("queryParmeterSplit", queryParmeterSplit)
    let id : number = parseFloat(queryParmeterSplit[3]);
    let veuneIdProp: string = queryParmeterSplit[4];

    const { loading, error, data } = useQuery(GET_COURSE_DETAILS, {
        variables: {
            id: id,
            veuneId: veuneIdProp
        }
    });

    if (loading) return <Layout><LoadingContainer><CircularProgress /></LoadingContainer></Layout>;
    if (error) return <Layout><LoadingContainer><Alert severity="error">
      Error please retry!
        </Alert> </LoadingContainer></Layout>;


    let { courseSummary,
        courseQualType,
        courseQualTitle,
        courseQualLvl,
        courseUrl,
        qualificationTitle,
        qualificationType,
        qualificationLevel,
        assessmentMethod,
        sSsaTier1Desc,
        sSsaTier2Desc,
        entryRequirements,
        equipmentRequired,
        sEntrySubLevelDesc,
        sSkillsForLife,
        skllsFundngApprvStatDesc,
        ucasTariff,
        sAwardingBodyName,
        qualRefAuthority,
        awardingOrgName
    } = data.combinedCourseByCourseId;

    const courseOpportunitiesDetail : any[] = data.combinedCourseByCourseId.oOpportunitiesByCourseId.nodes;

    // find info using venueId if there is more than one venue linked to course, otherwise return first node

    const courseOppFindOne = (courseOpportunitiesDetail: Array<String>) : String | undefined => {
        if (courseOpportunitiesDetail.length > 1) {
            return courseOpportunitiesDetail.find((element: any) => element.venueId === veuneIdProp);
        } else {
            return courseOpportunitiesDetail[0];
        }
    }
    const courseOpp : String | undefined = courseOppFindOne(courseOpportunitiesDetail);

    // render opportunities info using return from courseOppFindOne
    const oOpportunitiesDetails = (courseOpp: any) : JSX.Element => {
        return (
            <div style={{ wordWrap: 'break-word' }}>
                <div>
                    <H2>Opportunity Summary</H2>
                    <Paragraph>{courseOpp.opportunitySummary}</Paragraph>
                </div>
                <H2>Timings</H2>
                <Paragraph>{courseOpp.startDateDescription ? courseOpp.startDateDescription : 'Not Applicable'}</Paragraph>
                <table style={{ padding: '1.25rem 0rem' }}>
                    <tbody>
                        <tr>
                            <TH>End Date</TH>
                            <td>{courseOpp.endDate ? courseOpp.endDate : 'Not Applicable'}</td>
                        </tr>
                        <tr>
                            <TH>Duration</TH>
                            <td>{courseOpp.durationValue ? courseOpp.durationValue + " months" : null}</td>
                        </tr>
                    </tbody>
                </table>
                <H5>Timetable</H5>
                <small>{courseOpp.timetable ? courseOpp.timetable : 'Not Applicable'}</small>
                <H3>Description</H3>
                <Paragraph>{courseOpp.durationDescription ? courseOpp.durationDescription : 'Not Applicable'}</Paragraph>
                <div>
                    <H2>Fees and Funding</H2>
                    <Paragraph>{courseOpp.priceDescription}</Paragraph>
                    <table style={{ padding: '1.25rem 0rem' }}>
                        <tbody>
                            <tr>
                                <TH>Price</TH>
                                <td>{courseOpp.price ? courseOpp.price : 'Not Applicable'}</td>
                            </tr>
                            <tr>
                                <TH>DFE Funded</TH>
                                <td>{courseOpp.dfeFunded === true ? null : courseOpp.dfeFunded.toString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <H2>Apply</H2>
                    <H5>Apply From</H5>
                    <p>{courseOpp.applyFrom ? courseOpp.applyFrom : 'Please Contact'}</p>
                    <H5>Apply Until</H5>
                    <p>{courseOpp.applyUntil ? courseOpp.applyUntil : 'Please Contact'}</p>
                    <H5>Apply Throughout Year</H5>
                    <p>{courseOpp.applyThroughoutYear === null ? null : courseOpp.applyThroughoutYear.toString()}</p>
                    <H5>Apply To</H5>
                    <small style={{ wordWrap: 'break-word' }}>{courseOpp.applyTo}</small>
                </div>
                <div>
                    <H2>Enquire</H2>
                    <big>{courseOpp.enquireTo}</big>
                    <big>{courseOpp.enquireTo}</big>
                </div>
            </div>
        )
    }
    const courseOppResult : JSX.Element = oOpportunitiesDetails(courseOpp);
    return (
        <Layout>
            <SEO title={"Course Information"} description={"Further information on selected course including Summary, Qualification (title, type, level), Entry Requirements, Tuition and Fees, Assessment Method, Timings and more"} />
            <Header pageTitle={"Course Information"}></Header>
            <SubNav>
                <Button variant="outlined" onClick={() : void => history.goBack()}>Back</Button>
                {/* <Button variant="outlined" onClick={() => {
          // toggleFilterMenu()
        }} color="primary">
          Filters
            </Button> */}
            </SubNav>

            <CourseContainer style={{ wordWrap: 'break-word' }}>
                <H2>Course Summary</H2>
                <Paragraph>{courseSummary}</Paragraph>
                {courseUrl ? <big><a href={courseUrl}>{courseUrl}</a></big> : null}
                <H3>Qualification</H3>
                <table>

                    <tbody>
                        <tr>
                            <TH style={{ width: '20%' }}>Title</TH>
                            <td>{!courseQualTitle ? qualificationTitle : courseQualTitle}</td>
                        </tr>
                        <tr>
                            <TH style={{ width: '20%' }}>Type</TH>
                            <td>{!courseQualType ? qualificationType : courseQualType}</td>
                        </tr>
                        <tr>
                            <TH style={{ width: '20%' }}>Level</TH>
                            <td>{!courseQualLvl ? qualificationLevel : courseQualLvl}</td>
                        </tr>
                    </tbody>
                </table>
                <H3>Qualification</H3>
                <table>
                    <tbody>
                        <tr>
                            <TH style={{ width: '20%' }}>Tier 1</TH>
                            <td>{sSsaTier1Desc ? sSsaTier1Desc : 'N/A'}</td>
                        </tr>
                        <tr>
                            <TH style={{ width: '20%' }}>Tier 2</TH>
                            <td>{sSsaTier2Desc ? sSsaTier2Desc : 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <H2>Entry Requirements</H2>
                    <Paragraph>{entryRequirements}</Paragraph>
                    <H3>Extended Entry</H3>
                    <Paragraph>{sEntrySubLevelDesc ? sEntrySubLevelDesc : 'Not Applicable'}</Paragraph>
                    <H3>Equipment required</H3>
                    <Paragraph>{equipmentRequired}</Paragraph>
                </div>
                <table style={{ padding: '1.25rem 0rem' }}>
                    <tbody>
                        <tr>
                            <th>UCAS Tariff</th>
                            <th>Skills for Life</th>
                            <th>Skills Funding</th>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>{ucasTariff ? ucasTariff : 'Not Applicable'}</td>
                            <td style={{ textAlign: 'center' }}>{sSkillsForLife === null ? null : sSkillsForLife.toString()}</td>
                            <td style={{ textAlign: 'center' }}>{skllsFundngApprvStatDesc ? skllsFundngApprvStatDesc : 'Not Applicable'}</td>
                        </tr>
                    </tbody>
                </table>
                <H2>Assessment Method</H2>
                <Paragraph>{assessmentMethod}</Paragraph>
                <table style={{ padding: '1.25rem 0rem' }}>
                    <tbody>
                        <tr>
                            <TH>Awarding Orgainsation</TH>
                            <td>{awardingOrgName ? awardingOrgName : 'Not Applicable'}</td>
                        </tr>
                        <tr>
                            <TH>Awarding Body</TH>
                            <td>{sAwardingBodyName ? sAwardingBodyName : 'Not Applicable'}</td>
                        </tr>
                        <tr>
                            <TH>Authority</TH>
                            <td>{qualRefAuthority ? qualRefAuthority : 'Not Applicable'}</td>
                        </tr>
                    </tbody>
                </table>
                {courseOppResult}
            </CourseContainer>
        </Layout>
    );
}

export default CourseDetails

