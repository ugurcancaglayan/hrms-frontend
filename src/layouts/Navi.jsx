import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu size="massive" fixed={"top"}>
        <Container>
          <Menu.Item>
            <img
              className="logo"
              src="https://aday-asset.mncdn.com/img/kariyernet_new_logo.png"
            />
          </Menu.Item>
          <Menu.Item name="messages" />

          <Menu.Menu position="right">
            <Menu.Item>
              <Button className="signUp" primary>
                Kayıt Ol
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
