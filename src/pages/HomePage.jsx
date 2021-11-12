import Cookies from "js-cookie";
import { Card, Container } from "semantic-ui-react";

export default function HomePage() {
  const jobs = JSON.parse(localStorage.getItem("jobAdvs"));

  if (Cookies.get("user")) {
    var user = JSON.parse(Cookies.get("user"));
    console.log(JSON.parse(Cookies.get("user")).firstName)
  }


  var counter = 0;
  var jobCounter = 0;

  var jobList = [];
  
  jobs.map((job) => {
    if (counter < 6) {
      jobList.push(job);
      counter += 1;
    }
  });

  return (
    <div className="homePage">
      <div className="homepage-block">
        <h1 className="homepage-title">
          {Cookies.get("user") 
          ? <p>Merhaba {user.firstName}</p> 
          : null}
          Senin için burada {Cookies.get("jobNum")} ilan var!
        </h1>
      </div>
      <Container className="job-cards">
        <Card.Group centered>
          {jobList.map((job) => (
            <Card className="job-card">
              <Card.Content>
                <Card.Header>{job.jobPosition.position}</Card.Header>
                <Card.Meta>{job.employer.companyName}</Card.Meta>
                <Card.Description>{job.city.cityName}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    </div>
  );
}
