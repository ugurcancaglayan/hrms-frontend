import React, { useState, useEffect } from "react";
import { Image, Item, Segment } from "semantic-ui-react";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function JobAdvertisement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobs()
      .then((result) => setJobs(result.data.data));
  });

  return (
    <div>
      {jobs.map((job) => (
        <Segment key={job.id}>
          <Item.Group>
              <Item>
                <Item.Image
                  size="tiny"
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                />
                <Item.Content>
                  <Item.Header as="a">{job.jobPosition.position}</Item.Header>
                  <Item.Meta>{job.description}</Item.Meta>
                  <Item.Description>
                    {/* <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" /> */}
                    Son Başvuru Tarihi : {job.applicationDeadline.split("T")[0]}
                    <br />
                    Konum : {job.city.cityName}
                  </Item.Description>
                  <Item.Extra>
                    Ortalama Maaş : {job.minSalary} - {job.maxSalary}$
                    <br />
                    Alınacak Kişi Sayısı : {job.quota}
                  </Item.Extra>
                </Item.Content>
              </Item>
          </Item.Group>
        </Segment>
      ))}
    </div>
  );
}
