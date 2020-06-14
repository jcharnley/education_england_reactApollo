import * as React from 'react';
import { useState, useEffect } from "react"
import { withRouter, RouteComponentProps } from "react-router-dom";
import { SearchContainer, SearchFields, SearchEvent } from '../styles/search_styles'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Alert } from '@material-ui/lab';



interface SearchProps extends RouteComponentProps<any> {
    history: any
}

interface GeoLocation {
    lat: string,
    lng: string
}

const Search: React.FunctionComponent<SearchProps> = ({ history }) => {
    const [keyEvent, setLongLat] = useState<string>("");
    const [currentDistance, setDistance] = useState<number>(834.015);
    const [locationObject, saveLocation] = useState<GeoLocation>({ lat: "", lng: "" });
    const [validation, setValidaton] = useState<boolean | undefined>(undefined);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);


    useEffect(() => {
        return () => {
        }
    }, [keyEvent, setLongLat, currentDistance, setDistance, validation]);


    // using google maps api find lat and lng from response

    const findLocation = async (postcode: string): Promise<void> => {
        let response = await fetch(`${process.env.REACT_APP_GOOGLEAPI}${postcode}`);
        let data = await response.json();
        if (data.status !== 'OK') {
            setValidaton(false);
        } else {
            let countryValidation = await data.results[0].address_components.find((find: any) => find.long_name === 'England' || find.long_name === 'Scotland' || find.long_name === 'Wales');
            if (countryValidation === undefined) {
                setValidaton(false);
            } else {
                const { lat, lng } = await data.results[0].geometry.location;
                saveLocation({
                    lat: lat, lng: lng
                });
                setValidaton(true);
                setBtnDisabled(false);
            }

        }
    };

    const renderValidationMessage = (): JSX.Element | null => {
        if (validation === undefined) {
            return null;
        } else {
            return !validation ? <Alert severity="error">
                Invalild Postcode!
                    </Alert> : <Alert severity="success">
                    Postcode validated!
                    </Alert>
        }
    };

    return (
        <SearchContainer>
            <SearchFields>
                <div>
                    <InputLabel shrink={true} htmlFor="component-disabled">PostCode</InputLabel>
                    <Input id="filled-basic" onChange={event => {
                        setLongLat(event.currentTarget.value)
                    }}
                        value={keyEvent} onBlur={() => {
                            if (keyEvent === "" || keyEvent.length < 5) {
                                setValidaton(undefined);
                            } else {
                                findLocation(keyEvent);
                            }
                        }
                        }
                        onFocus={(): void => {
                            setBtnDisabled(true);
                            setValidaton(undefined);
                        }
                        }
                    />
                </div>
                <FormControl>
                    <InputLabel shrink={true} htmlFor="distance-native-helper">Distance</InputLabel>
                    <NativeSelect
                        value={currentDistance}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            const cast = parseFloat(event.target.value);
                            setDistance(cast as number);
                        }}
                    >
                        <option value={834.015}>1/2 mile</option>
                        <option value={1668.03}>1 mile</option>
                        <option value={5004.09}>3 mile</option>
                        <option value={8340.15}>5 mile</option>
                        <option value={33360.6}>20 mile</option>
                        <option value={66721.2}>25 mile</option>
                        <option value={83401.5}>50 mile</option>
                    </NativeSelect>
                </FormControl>
            </SearchFields>
            {renderValidationMessage()}
            <SearchEvent>
                <Button variant="contained" disabled={btnDisabled} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                    history.push(`/course_list/${locationObject.lat}/${locationObject.lng}/${currentDistance}`);
                }}>Search</Button>
            </SearchEvent>
        </SearchContainer>
    );
}

export default withRouter(Search)
