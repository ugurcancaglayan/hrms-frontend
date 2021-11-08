import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Menu.Item>
        <Button as={Link} to="/jobseekers/signup" className="signUp" primary>
          Sign Up
        </Button>
        <Button
          as={Link}
          to="/jobseekers/login"
          style={{ marginLeft: "0.5em" }}
          onClick={signIn}
          className="signUp"
          primary
        >
          Sing In
        </Button>
        <Button style={{ marginLeft: "0.5em" }} className="employer" primary>
          Employer
        </Button>
      </Menu.Item>
    </div>
  );
}
