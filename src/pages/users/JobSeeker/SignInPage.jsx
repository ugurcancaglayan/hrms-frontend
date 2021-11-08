import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import * as yup from "yup";
import HrmsInput from "../../../utilities/customFormControls/HrmsInput";
import JobSeekerService from "../../../services/jobSeekerService";
import Navi from "../../../layouts/Navi";
import Cookies from "js-cookie";
import HomePage from "../../HomePage";

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
      .then((result) => setSignValues(result.data.data));
      window.location.reload()
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
      history.push("/")
    }
  };

  useEffect(() => {
    readCookie();
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <Form className="ui form">
          <HrmsInput name="email" placeholder="Email" />
          <HrmsInput name="password" placeholder="Password" />
          <Button color="green" type="submit">
            Sign In
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
