import React from "react";
import { Route } from "react-router";
import { Grid } from "semantic-ui-react";
import HomePage from "../pages/HomePage";
import JobAdvertisement from "../pages/JobAdvertisement";
import JobAdvertisementDetail from "../pages/JobAdvertisementDetail";
import SignInPage from "../pages/users/JobSeeker/SignInPage";
import SignUpPage from "../pages/users/JobSeeker/SignUpPage";

export default function Dashboard() {
  return (
    <div>
      <Route exact path="/">
        <Route path="/" component={HomePage} />
      </Route>

      <Route path="/jobAdvertisements">
        <Grid>
          <Grid.Row>
            {/* <Grid.Column width={4}>
              <Sidebar />
            </Grid.Column> */}
            <Grid.Column width={16}>
              <Route
                exact
                path="/jobAdvertisements"
                component={JobAdvertisement}
              />
              <Route
                path="/jobAdvertisements/:id"
                component={JobAdvertisementDetail}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Route>
      <Route path="/jobseekers">
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Route path="/jobseekers/login" component={SignInPage} />
              <Route path="/jobseekers/signup" component={SignUpPage} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Route>
    </div>
  );
}
