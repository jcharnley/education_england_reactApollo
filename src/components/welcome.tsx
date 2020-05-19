import * as React from 'react';

interface WelcomeProps {
 name: string,
}
export const Welcome: React.SFC<WelcomeProps> = (props) => {
 return <h1>Hello, {props.name}</h1>;
}
export default Welcome