import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Grid, Segment } from "semantic-ui-react";
import * as yup from "yup";
import HrmsInput from "../../../utilities/customFormControls/HrmsInput";
import JobSeekerService from "../../../services/jobSeekerService";
import Cookies from "js-cookie";
import alertify from "alertifyjs";

export default function SignInPage() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [signValues, setSignValues] = useState();

  const history = useHistory();

  let jobSeekerService = new JobSeekerService();

  const initialValues = { email: "", password: "" };

  const schema = yup.object({
    email: yup.string().required("Email is required."),
    password: yup.string().required("Password is required."),
  });

  const onSubmit = (values) => {
    jobSeekerService
      .findByEmailAndPassword(values.email, values.password)
      .then((result) => {
        if (result.data.data == null) {
          alertify.alert("Error", "Please enter the information correctly!");
        } else {
          setSignValues(result.data.data);
          window.location.reload();
        }
      });
  };

  const readCookie = () => {
    if (signValues) {
      Cookies.set("userName", signValues.firstName);
      Cookies.set("userMail", signValues.email);
      console.log(Cookies.get("userName"));
    }

    const userName = Cookies.get("userName");

    if (userName) {
      setisAuthenticated(true);
      history.push("/");
    }
  };

  useEffect(() => {
    readCookie();
  });

  return (
    <div className="signInPage">
      <Grid columns={4} textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Segment>
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
              >
                <Form className="ui form">
                  <div class="field">
                    <HrmsInput name="email" placeholder="Email" />
                  </div>
                  <div class="field">
                    <HrmsInput type="password" name="password" placeholder="Password" />
                  </div>
                  <div class="field">
                    <Button color="green" type="submit">
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Formik>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
