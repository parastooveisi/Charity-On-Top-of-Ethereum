import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import charity from "../../ethereum/charity";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";
import Layout from "../../components/Layout";

class RequestNew extends Component {
  state = {
    name: "",
    recipient: "",
    loading: false,
    errorMessage: ""
  };

  onSubmit = async event => {
    event.preventDefault();

    const charity = charity(this.props.address);
    const { name, recipient } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await charity.methods
        .createCharityInfo(name, recipient)
        .send({ from: accounts[0] });

      //Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Enter Charity Name and Address</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <Input />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Link route={`/charity/charities`}>
            <a>
              <Button primary loading={this.state.loading}>
                Create!
              </Button>
            </a>
          </Link>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
