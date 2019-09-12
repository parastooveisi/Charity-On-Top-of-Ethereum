import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import charity from "../ethereum/charity";
import Layout from "../components/Layout";
import { Link } from "../routes";
import web3 from "../ethereum/web3";

class Charity extends Component {
  static async getInitialProps(props) {
    const contributers = await charity.methods.getContributers().call();
    const summary = await charity.methods.getSummary().call();
    return {
      contributers,
      balance: web3.utils.fromWei(summary[0], "ether"),
      contributersCount: summary[1],
      manager: summary[2]
      //charityInfo: summary[3]
    };
  }

  renderContributers() {
    const items = this.props.contributers.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/contributers/${address}`}>
            <a />
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }
  renderCards() {
    const { balance, contributersCount, manager } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description: "Manager created this contract",
        style: { overflowWrap: "break-word" }
      },
      {
        header: balance,
        meta: "Balance (ether)",
        description: "Total money in this contract",
        style: { overflowWrap: "break-word" }
      },
      {
        header: contributersCount,
        meta: "Contributers",
        description: "Total number of donaters",
        style: { overflowWrap: "break-word" }
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
          />

          <h3> List of all contributers! </h3>
          <Link route="contribute/contribute">
            <a>
              <Button
                floated="right"
                content="Donate"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderContributers()}
        </div>
        <div>{this.renderCards()}</div>
      </Layout>
    );
  }
}

export default Charity;
