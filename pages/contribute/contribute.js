import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import charity from "../../ethereum/charity";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class Contribute extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    this.setState({ loading: true, errorMessage: "" });
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      await charity.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Donation to a charity</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>The amount has to be more that 1 Ether!</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Donate!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default Contribute;
