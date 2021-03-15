 import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Typography,
  Layout,
  Space,
  Row,
  Col,
  Menu,
  Tabs,
  Form,
  Input,
  List,
  Card,
  Divider,
  Button
} from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  PartitionOutlined,
  HeartTwoTone
} from '@ant-design/icons';
import nearlogo from './assets/gray_near_logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      speech: null,
      balance: '500',
      validators: [
        {
          accountId: 'nuc.test',
          active: true
        },
        {
          accountId: 'pepper.test',
          active: false
        }
      ]
    }
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignIn = this.requestSignIn.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
    this.signedOutFlow = this.signedOutFlow.bind(this);
    this.changeGreeting = this.changeGreeting.bind(this);
  }

  componentDidMount () {
    let loggedIn = this.props.wallet.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.signedOutFlow();
    }
  }

  async signedInFlow () {
    console.log("come in sign in flow")
    this.setState({
      login: true,
    })
    const accountId = await this.props.wallet.getAccountId()
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
    await this.welcome();
  }

  async welcome () {
    const response = await this.props.contract.welcome({ account_id: accountId });
    this.setState({ speech: response.text });
  }

  async requestSignIn () {
    const appTitle = 'NEAR Delegator';
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    )
  }

  requestSignOut () {
    this.props.wallet.signOut();
    setTimeout(this.signedOutFlow, 500);
    console.log("after sign out", this.props.wallet.isSignedIn())
  }

  async changeGreeting () {
    await this.props.contract.setGreeting({ message: 'howdy' });
    await this.welcome();
  }

  signedOutFlow () {
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
    this.setState({
      login: false,
      speech: null
    })
  }

  render () {
    const { Header, Footer, Sider, Content } = Layout;
    const { Title, Paragraph, Text } = Typography;
    return (
      <Layout>
        <Header id="top-nav" style={{ padding: 0 }}>
          <Menu theme="light" mode="horizontal">
            <Menu.Item disabled>
              <img className="logo" src={nearlogo} alt="NEAR logo" />
            </Menu.Item>
          </Menu>
          {this.state.login && <Menu theme="light" mode="horizontal">
            <Menu.SubMenu
              key="profile"
              title={
                <span>
                  <UserOutlined />
                  <span>user.id</span>
                </span>
              }
            >
              <Menu.Item onClick={this.requestSignOut}>
                Sign Out
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>}
        </Header>
        <Layout hasSider="true">
          <Sider>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
              <Menu.Item key="home">
                <HomeOutlined />
                <span className="nav-text">Home</span>
              </Menu.Item>
              <Menu.Item key="validators">
                <PartitionOutlined />
                <span className="nav-text">Validators</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="main">
            {this.state.login ?
              <Content style={{ padding: '24px 24px' }}>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <Card title="My Balance">
                      <Title level={2}><span>{this.state.balance} </span>NEAR</Title>
                      <p>{this.state.speech}</p>
                      <Button type="primary" onClick={this.changeGreeting}>Change greeting</Button>
                    </Card>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <Tabs defaultActiveKey="0">
                      <Tabs.TabPane tab="Active Validators" key="0">
                        <List 
                          itemLayout="vertical"
                          dataSource={this.state.validators}
                          renderItem={(validator) => (
                            <List.Item key={validator.accountId} style={{ padding: '0 0 8px 0' }}>
                              <Card title={validator.accountId}>card content</Card>
                            </List.Item>
                          )}
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Available Validators" key="1">
                        <List/>
                      </Tabs.TabPane>
                    </Tabs>
                  </Col>
                  <Col span={12}>
                    <Tabs defaultActiveKey="0">
                      <Tabs.TabPane tab="Deposit" key="0">
                        <Card title="Deposit">
                          <Form 
                            layout="inline"
                            name="deposit_form"
                            // onFinish={onSubmitDeposit}
                          >
                            <Form.Item>
                              <Input size="large" placeholder="0" />
                            </Form.Item>
                            <Form.Item>
                              <Button size="large" type="primary" htmlType="submit">
                                Deposit NEAR
                              </Button>
                            </Form.Item>
                          </Form>
                        </Card>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Withdraw" key="1">
                        <Card title="Withdraw">
                        </Card>
                      </Tabs.TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </Content>
              : 
              <Content className="unauthorized">
                <Button type="primary" onClick={this.requestSignIn}>Log in with NEAR</Button>
              </Content>
            }
            <Footer>
              <Title level={4}>
                prototyped with <HeartTwoTone twoToneColor="#df5f6a" /> by @gabsong
              </Title>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App;
