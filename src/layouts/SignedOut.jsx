import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { RiArrowDropDownLine } from "react-icons/ri";

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
          className="signIn"
          primary
        >
          Sing In
        </Button>
        {/* <Button style={{ marginLeft: "0.5em" }} className="employer" primary>
          Employer
        </Button> */}
        <div className="ui compact menu employer" style={{ marginLeft: "0.5em" }}>
          <div className="ui simple dropdown item employer-button">
            Employer
            <i class="dropdown icon" style={{ color: "white" }}></i>
            <div class="menu">
              <div class="item">Sign In</div>
              <div class="item">Let's Call You</div>
            </div>
          </div>
        </div>
      </Menu.Item>
    </div>
  );
}
