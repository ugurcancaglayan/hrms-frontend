import React, { useState, useEffect } from "react";
import { Button, Divider, Icon } from "semantic-ui-react";
import { useParams } from "react-router";
import JobAdvertisementService from "../services/jobAdvertisementService";
import moment from "moment";

export default function JobAdvertisementDetail() {
  let { id } = useParams();

  const [jobAdv, setJobAdv] = useState({});

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getEmployersActiveJobAdv(id)
      .then((result) => setJobAdv(result.data.data));
    console.log(jobAdv);
  }, []);

  return (
    <div id={jobAdv.id} className="job-detail" style={{ marginTop: "2em" }}>
      <div>
      <Button className="signUp" primary>
          Apply
        </Button>
      </div>
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
      <Divider style={{ marginTop: "4em", marginBottom: "4em" }} />
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
      <p style={{ textAlign: "center" }}>
        Updated on {moment(jobAdv.createdDate).format("DD MMMM YYYY")} - Will be
        closed on {moment(jobAdv.applicationDeadline).format("DD MMMM YYYY")}
      </p>
    </div>
  );
}
