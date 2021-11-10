import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Button, Grid, Segment } from "semantic-ui-react";
import HrmsInput from "../../../utilities/customFormControls/HrmsInput";
import JobSeekerService from "../../../services/jobSeekerService";
import alertify from "alertifyjs";

export default function SignUpPage() {
  const [confirm, Confirm] = useState(false);
  const [signValues, setSignValues] = useState();

  let jobSeekerService = new JobSeekerService();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    nationalId: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Email is required."),
    email: yup
      .string()
      .email("Email must be a valid email.")
      .required("Email is required."),
    nationalId: yup
      .string()
      .length(11, "ID's length must be 11 characters.")
      .required("Date is required."),
    dateOfBirth: yup.date().required("Date is required."),
    password: yup.string().required("Password is required."),
    confirmPassword: yup.string().required("Confirm Password is required."),
  });

  const onSubmit = (values) => {
    console.log(values);
    jobSeekerService.add(values, values.confirmPassword).then((result) => {
      if (result.data.success === true) {
        alertify.success(result.data.message);
        setTimeout(function () {
          window.location.reload(1);
        }, 1000);
      } else if (result.data.message) {
        alertify.error(result.data.message);
      }
    });
  };

  return (
    <div className="signUpPage">
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
                    <HrmsInput name="firstName" placeholder="First Name" />
                  </div>
                  <div class="field">
                    <HrmsInput name="lastName" placeholder="Last Name" />
                  </div>
                  <div class="field">
                    <HrmsInput name="email" placeholder="Email" />
                  </div>
                  <div class="field">
                    <HrmsInput name="nationalId" placeholder="National ID" />
                  </div>
                  <div class="field">
                    <HrmsInput
                      type="date"
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <div class="field">
                    <HrmsInput
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="field">
                    <HrmsInput
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div class="field">
                    <Button color="green" type="submit">
                      Sign Up
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
