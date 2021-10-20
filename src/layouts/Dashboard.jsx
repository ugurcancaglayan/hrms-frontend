import React from "react";
import { Grid } from "semantic-ui-react";
import JobAdvertisement from "../pages/JobAdvertisement";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <JobAdvertisement />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
