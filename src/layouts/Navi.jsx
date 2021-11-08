import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { useHistory } from "react-router";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Cookies from "js-cookie";

export default function Navi() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const history = useHistory();

  function handleSignOut() {
    setisAuthenticated(false);
    Cookies.remove("userName");
    // history.push("/");
    window.location.reload()
  }

  function handleSignIn() {
    setisAuthenticated(true);
    // history.push("/");
  }

  return (
    <div className="navi">
      <Menu size="massive" fixed={"top"}>
        <Container>
          <Menu.Item as={Link} to="/">
            <img
              className="logo"
              src="https://aday-asset.mncdn.com/img/kariyernet_new_logo.png"
              alt="kariyer.net"
            />
          </Menu.Item>
          <Menu.Item header as={Link} to="/jobAdvertisements" name="Job Ads" />
          <Menu.Item header name="Resumes" />
          <Menu.Menu position="right">
            {Cookies.get("userName") ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
