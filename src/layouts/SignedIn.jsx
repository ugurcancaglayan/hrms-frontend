import Cookies from "js-cookie";
import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";

export default function SignedIn({ signOut }) {

  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        />
        <Dropdown
          pointing
          text={JSON.parse(Cookies.get("user")).firstName}
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Profilim" />
            <Dropdown.Item onClick={signOut} text="Çıkış Yap" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
