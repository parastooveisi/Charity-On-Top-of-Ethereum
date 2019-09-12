import React from "react";
import { Container, Menu } from "semantic-ui-react";
import Head from "next/head";
import { Link } from "../routes";

export default props => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
      </Head>
      <Menu style={{ marginTop: "10px" }}>
        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Contributers</a>
          </Link>
          <Link route="/charity/charities">
            <a className="item">Charities</a>
          </Link>
          <Link route="/contribute/contribute">
            <a className="item">Donate</a>
          </Link>
          <Link route="/charity/new">
            <a className="item">Create New Charity</a>
          </Link>
        </Menu.Menu>
      </Menu>
      {props.children}
    </Container>
  );
};
