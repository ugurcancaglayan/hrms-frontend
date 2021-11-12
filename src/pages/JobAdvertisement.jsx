import Cookies from "js-cookie";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Item,
  Segment,
} from "semantic-ui-react";
import CityService from "../services/cityService";
import JobAdvertisementService from "../services/jobAdvertisementService";
import WorkTimeService from "../services/workTimeService";
import WorkTypeService from "../services/workTypeService";

export default function JobAdvertisement() {
  const [jobs, setJobs] = useState([]);

  const [cities, setCities] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const [cityId, setCityId] = useState(0);
  const [workTimeId, setWorkTimeId] = useState(0);
  const [workTypeId, setWorkTypeId] = useState(0);

  let cityService = new CityService();
  let jobAdvertisementService = new JobAdvertisementService();
  let workTypeService = new WorkTypeService();
  let workTimeService = new WorkTimeService();

  function handleSorted() {
    jobAdvertisementService
      .getAllActiveSorted()
      .then((result) => setJobs(result.data.data));
  }

  function filterJobs() {
    jobAdvertisementService
      .filterJobs(cityId, workTimeId, workTypeId)
      .then((result) => setJobs(result.data.data));
  }

  useEffect(() => {
    cityService.getCities().then((result) => setCities(result.data.data));
    workTimeService.getAll().then((result) => setWorkTimes(result.data.data));
    workTypeService.getAll().then((result) => setWorkTypes(result.data.data));

    if (isSorted === false) {
      jobAdvertisementService
        .getJobs()
        .then((result) => setJobs(result.data.data));
    } else {
      jobAdvertisementService
        .getAllActiveSorted()
        .then((result) => setJobs(result.data.data));
    }
  }, []);

  if (jobs) {
    localStorage.setItem("jobAdvs", JSON.stringify(jobs));
    Cookies.set("jobNum", jobs.length);
  }

  var cityList = [];
  cities.map((city) =>
    cityList.push({
      key: city.id,
      text: city.cityName,
      value: city.id,
    })
  );

  var workTimeList = [];
  workTimes.map((workTime) =>
    workTimeList.push({
      key: workTime.id,
      text: workTime.workTime,
      value: workTime.id,
    })
  );

  var workTypeList = [];
  workTypes.map((workType) =>
    workTypeList.push({
      key: workType.id,
      text: workType.workType,
      value: workType.id,
    })
  );

  const handleCity = (value) => {
    setCityId(value);
  };

  const handleWorkTime = (value) => {
    setWorkTimeId(value);
  };

  const handleWorkType = (value) => {
    setWorkTypeId(value);
  };

  return (
    <div className="job-advs">
      <Container>
        <h2 style={{ textAlign: "initial" }}>{jobs.length} Job Ads</h2>

        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment>
                <Button
                  style={{ backgroundColor: "#912da1", color: "#fff" }}
                  onClick={handleSorted}
                >
                  Sort By Date
                </Button>
                <Divider />
                <Form>
                  <Form.Select
                    style={{ marginBottom: "1em" }}
                    name="city"
                    placeholder="City"
                    options={cityList}
                    onChange={(event, data) => handleCity(data.value)}
                  />
                  <Form.Select
                    style={{ marginBottom: "1em" }}
                    name="workType"
                    placeholder="Work Type"
                    options={workTypeList}
                    onChange={(event, data) => handleWorkType(data.value)}
                  />
                  <Form.Select
                    style={{ marginBottom: "1em" }}
                    name="workTime"
                    placeholder="Work Time"
                    options={workTimeList}
                    onChange={(event, data) => handleWorkTime(data.value)}
                  />
                </Form>

                <Button
                  fluid
                  style={{ backgroundColor: "#912da1", color: "#fff" }}
                  onClick={filterJobs}
                >
                  Filter
                </Button>
                <Button
                  fluid
                  style={{
                    backgroundColor: "#912da1",
                    color: "#fff",
                    marginTop: "1em",
                  }}
                  onClick={() => window.location.reload()}
                >
                  Clear Filter
                </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              {jobs.map((job) => (
                <Segment key={job.id} className="job-card">
                  <Link to={`/jobAdvertisements/${job.id}`}>
                    <Item.Group>
                      <Item>
                        <Item.Image
                          size="tiny"
                          src="https://react.semantic-ui.com/images/wireframe/image.png"
                        />
                        <Item.Content style={{ textAlign: "justify" }}>
                          <Item.Header as="a">
                            {job.jobPosition.position}
                          </Item.Header>
                          <Item.Description>
                            {job.city.cityName}
                          </Item.Description>
                          <Item.Meta>{job.employer.companyName}</Item.Meta>
                          <br />
                          <span
                            style={{
                              color: "#333",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            {job.workTime.workTime}
                          </span>
                          <span
                            style={{
                              float: "right",
                              color: "black",
                            }}
                          >
                            {moment(job.createdDate).format("DD MMMM YYYY")}
                          </span>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Link>
                </Segment>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
