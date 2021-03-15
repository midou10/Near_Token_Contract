import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NearHeader from './components/NearHeader';
import MainContent from './components/MainContent';
import NearFooter from './components/NearFooter';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import data from './data';
import './App.css';
import { getWalletBalance, getAccountId } from './utils/api';
const { Content, Footer } = Layout;

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      login: false,
      accountId: null,
      balance: null,
      loading: true,
      validators: data,
      route: 'validators',
      stakes: [data[0]],
      // for Context API
      signIn: () => {
        console.log('setState invoked, signIn', this);
        this.setState(({ login }) => {
          if (!login) {
            return ({ login: true })
          }
        });
      },
      signOut: () => {
        console.log(this);
        this.setState(({ login }) => {
          console.log('setState invoked, signOut', this);
          if (login) {
            return ({ login: false })
          }
        });
      },
    };

    // this bindings
    this.requestSignIn = this.requestSignIn.bind(this);
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
  }

  // componentDidMount
  componentDidMount () {
    let loggedIn = this.props.wallet.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.state.signOut();
    }
  }

  // class methods
  async requestSignIn () {
    const appTitle = 'NEAR Delegator';
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    )
  }

  async signedInFlow () {
    const { wallet } = this.props;
    this.state.signIn();
    const accountId = getAccountId(wallet);
    const balance = await getWalletBalance(wallet);
    this.setState(() => ({ accountId, balance }));
  }

  requestSignOut () {
    this.props.wallet.signOut();
    this.state.signOut();
    console.log("after sign out, isSignedIn?", this.props.wallet.isSignedIn())
  }

  render () {
    const { login, accountId, balance, validators, stakes } = this.state;
    
    return (
      <Layout>
        <NearHeader 
          title="Staking Rewards"
          login={login}
          requestSignIn={this.requestSignIn}
          requestSignOut={this.requestSignOut}
          accountId={accountId}
          balance={balance}
        />
        <Content className="flex flex-center content">
          <div className="desktop">
            <MainContent
              login={login}
              validators={validators}
              stakes={stakes}
            />
          </div>
        </Content>
        <Footer>
          <NearFooter />
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  contract: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired
};
