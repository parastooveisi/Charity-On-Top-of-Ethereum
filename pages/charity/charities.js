import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import charity from "../../ethereum/charity";
import Layout from "../../components/Layout";

class charitiesSummary extends Component {
  static async getInitialProps(props) {
    const charityCount = await charity.methods.getcharitiesCount().call();

    const charities = await Promise.all(
      Array(parseInt(charityCount))
        .fill()
        .map((element, index) => {
          return charity.methods.charityInfo(index).call(); //iterate from index up to requestCount
        })
    );

    return { address, charities, charityCount };
  }

  renderCharities() {
    const items = this.props.charities.map(address => {
      return {
        header: address,
        description: charity,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return <Layout>{this.renderCharities()}</Layout>;
  }
}
export default charitiesSummary;
