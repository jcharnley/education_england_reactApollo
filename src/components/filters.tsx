import * as React from 'react';
import { useState } from "react"
// import { useLazyQuery } from '@apollo/react-hooks';
// import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
// import gql from 'graphql-tag';
import SEO from './seo'
// import Layout from './layout'
// import Header from './header'
import Search from './search'
import { FilterSection, Select } from '../styles/filters_style'
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// import Switch from '@material-ui/core/Switch';


interface FilterProps {
    isFiltersOpen: boolean
    refetch: any
}

const Filters: React.FunctionComponent<FilterProps> = (props) => {
    const { refetch } = props
    const [currentLvl, setLevel] = useState("")
    const [currentSubject, setSubject] = useState("")

    // useEffect(() => {
    //     return () => {
    //       console.log(`Unmounted`)
    //     }
    //   },[keyEvent, setLongLat, currentDistance, setDistance])

    return (
        <div>
            <SEO title={"Filters"} description={"Filter Course Results"} />
            <h2>Filters page</h2>
            <Search></Search>
            <FilterSection>
                <Select width={'80%'}>
                    <InputLabel>Subject</InputLabel>
                    <NativeSelect style={{ width: '100%' }}
                        value={currentSubject}
                        onChange={(event: any) => {
                            setSubject(event.target.value)
                        }}
                    >
                        <option aria-label="None" />
                        <option value={"Unknown"}>Unknown</option>
                        <option value={"Not Applicable"}>Not Applicable</option>
                        <option value={"Social Sciences"}>Social Sciences</option>
                        <option value={"History, Philosophy and Theology"}>History, Philosophy and Theology</option>
                        <option value={"Agriculture, Horticulture and Animal Care"}>Agriculture, Horticulture and Animal Care</option>
                        <option value={"Science and Mathematics"}>Science and Mathematics</option>
                        <option value={"Education and Training"}>Education and Training</option>
                        <option value={"Leisure, Travel and Tourism"}>Leisure, Travel and Tourism</option>
                        <option value={"Arts, Media and Publishing"}>Arts, Media and Publishing</option>
                        <option value={"Languages, Literature and Culture"}>Languages, Literature and Culture</option>
                        <option value={"Preparation for Life and Work"}>Preparation for Life and Work</option>
                        <option value={"Construction, Planning and the Built Environment"}>Construction, Planning and the Built Environment</option>
                        <option value={"Health, Public Services and Care"}>Health, Public Services and Care</option>
                        <option value={"Retail and Commercial Enterprise"}>Retail and Commercial Enterprise</option>
                        <option value={"Engineering and Manufacturing Technologies"}>Engineering and Manufacturing Technologies</option>
                        <option value={"Business, Administration and Law"}>Business, Administration and Law</option>
                        <option value={"Information and Communication Technology"}>Information and Communication Technology</option>
                    </NativeSelect>
                </Select>
                <Select width={'40%'}>
                    <InputLabel>Qualifcation Level</InputLabel>
                    <NativeSelect style={{ width: '100%' }}
                        value={currentLvl}
                        onChange={(event: any) => {
                            setLevel(event.target.value)
                        }}
                    >
                        <option aria-label="None" />
                        <option value={"LV0"}>LvL 0</option>
                        <option value={"LV1"}>Lvl 1</option>
                        <option value={"LV2"}>Lvl 2</option>
                        <option value={"LV3"}>Lvl 3</option>
                        <option value={"LV4"}>Lvl 4</option>
                        <option value={"LV5"}>Lvl 5</option>
                        <option value={"LV6"}>Lvl 6</option>
                    </NativeSelect>
                </Select>
                {/* <React.Fragment> */}
                <button onClick={() => {
                    refetch({
                        courseQualLvl: currentLvl === "" ? null : currentLvl
                        // sSsaTier1Desc: currentSubject
                    })
                }}>Refetch</button>
                {/* </React.Fragment> */}

            </FilterSection>

        </div>
    );
}

export default Filters

// 