import React from 'react';
import './App.css';
import HomePage from './pages/homepage'
import CourseList from './pages/course_list'
import CourseDetails from './pages/course_details'
import AllCoursesByVenue from './pages/allCoursesByVenue'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path='/course_list/course/:id/:venueId'
          children={() => <CourseDetails />}
        />
        <Route
          path='/course_list'
          children={() => <CourseList />}
        />
        <Route
          path='/venue/courses/:venueId'
          children={() => <AllCoursesByVenue />}
        />
      </Switch>
    </Router>
  );
}

export default withRouter(App);
