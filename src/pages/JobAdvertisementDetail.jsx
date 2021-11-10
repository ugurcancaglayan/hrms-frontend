import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Image,
  Item,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMeta,
  Label,
  Segment,
} from "semantic-ui-react";
import { useParams } from "react-router";
import JobAdvertisementService from "../services/jobAdvertisementService";
import moment from "moment";
import { Link, NavLink } from "react-router-dom";
import alertify from "alertifyjs";

export default function JobAdvertisementDetail() {
  let { id } = useParams();

  const [jobAdv, setJobAdv] = useState({});
  const [clicked, setClicked] = useState(false);

  const result = localStorage.getItem("jobAdvs");

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getEmployersActiveJobAdv(id)
      .then((result) => setJobAdv(result.data.data));
  }, []);

  console.log(clicked);
  if (clicked === true) {
    window.location.reload();
  }

  var arr = JSON.parse(result);
  var jobList = [];
  var counter = 0;
  arr.map((job) => {
    if (counter < 3) {
      jobList.push(job);
      console.log(jobList);
      counter += 1;
    }
  });
  var jobCounter = 0;
  var arrCounter = 0;
  var BreakException = {};

  return (
    <div id={jobAdv.id} className="job-detail" style={{ marginTop: "2em" }}>
      <div className="apply-job">
        <Button
          onClick={() =>
            alertify.notify(
              "The job advertisement has been applied.",
              "success"
            )
          }
          primary
        >
          Apply
        </Button>
      </div>
      <Container className="job-advs-detail">
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              <h2 style={{ color: "#912da2", fontFamily: "Rubik, sans-serif" }}>
                JOB DESCRIPTION
              </h2>
              <p style={{ marginTop: "2em" }}>
                <span>
                  <h2>{jobAdv.employer?.companyName}</h2>
                </span>
              </p>
              <p>
                <Icon name="mail" />
                <span>{jobAdv.jobPosition?.position}</span>
              </p>
              <p>
                <Icon name="linkify" />
                <span>{jobAdv.employer?.webSite}</span>
              </p>
              <p>
                <Icon name="phone" />
                <span>{jobAdv.employer?.phoneNumber}</span>
              </p>

              <p style={{ marginTop: "4em" }}>
                <span>
                  <strong>Job Description</strong>
                </span>
              </p>
              <p>{jobAdv.description}</p>
              <ul>
                <li>
                  <strong>State : </strong>
                  {jobAdv.city?.cityName}
                </li>
                <li>
                  <strong>Work Type : </strong>
                  {jobAdv.workType?.workType}
                </li>
                <li>
                  <strong>Work Time : </strong>
                  {jobAdv.workTime?.workTime}
                </li>
                <li>
                  <strong>Quota : </strong>
                  {jobAdv.quota}
                </li>
                <li>
                  <strong>Salary : </strong>
                  {jobAdv.minSalary}-{jobAdv.maxSalary}
                </li>
              </ul>
              <Segment style={{ background: "none", marginTop: "5rem" }}>
                <p style={{ textAlign: "center" }}>
                  Updated on {moment(jobAdv.createdDate).format("DD MMMM YYYY")}{" "}
                  - Will be closed on{" "}
                  {moment(jobAdv.applicationDeadline).format("DD MMMM YYYY")}
                </p>
              </Segment>
            </Grid.Column>

            <Grid.Column width={5}>
              <Segment className="other-advs">
                <div className="title">Other Ads You May Interested In</div>
                {jobList.map(
                  (job) => (
                    (arrCounter += 1),
                    (jobCounter += 1),
                    (
                      <Link
                        to={`/jobAdvertisements/${job.id}`}
                        onClick={() => setClicked(true)}
                      >
                        <Item.Group className="ads-group">
                          <Item>
                            <Item.Image
                              size="tiny"
                              src="https://react.semantic-ui.com/images/wireframe/image.png"
                            />
                            <Item.Content verticalAlign="bottom">
                              <Item.Header as="a">
                                {job.jobPosition.position.toUpperCase()}
                              </Item.Header>
                              <Item.Meta>{job.employer.companyName.toUpperCase()}</Item.Meta>
                              <Item.Extra>{job.city.cityName}</Item.Extra>
                            </Item.Content>
                          </Item>
                          {jobCounter === jobList.length ? null : <Divider />}
                        </Item.Group>
                      </Link>
                    )
                  )
                )}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
