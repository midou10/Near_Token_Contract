import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text'
import Flag from 'react-world-flags';
import { List, Avatar, Button, Space } from 'antd';
const { Item } = List;

export default function MainContent ({ login, validators, stakes }) {
  // The app has two main views: a list view and a detail view
  // We're returning two lists
    // one has validators where the user has staked tokens (shown post login)
    // one has all available validators
  // Detail view only available post login
  const headerText = login ? 'Dashboard' : 'Validators';
  return (
    <React.Fragment>
      <h1>{headerText}</h1>
      {login && stakes.length > 0 &&
        <List className="list-primary">
          {stakes.map((validator) => (
            <Item key={validator.account}>
              <Space size={19} direction="horizontal" className="flex align-center">
                <Avatar shape="square" size={90}></Avatar>
                <div>
                  <div className="flex align-center">
                    <Text className="subheader-md">{validator.name}</Text>
                    <Flag code={validator.country} height="18" />
                  </div>
                  <ul>
                    <li><Text>Transaction 1</Text></li>
                    <li><Text>Transaction 2</Text></li>
                    <li><Text>Transaction 3</Text></li>
                    <li><Text>Transaction 4</Text></li>
                  </ul>
                </div>
                <div className="noclass-performance">
                  <h3>
                    {`Earning ${validator.earnings / 10000}% | Fees ${validator.fees_lower / 10000}%`}
                  </h3>
                  <div className="noclass-graph"></div>
                </div>
                <div className="noclass-balance-details">
                  <Text className="subheader-lg">&#9411; {validator.my_stake / 10000}</Text>
                  <Button className="btn-custom" size="large">View Details</Button>
                </div>
              </Space>
            </Item>
          ))}
        </List>
      }
      <List className="test" header="EXPLORE OTHER VALIDATORS">
        {validators.map((validator) => (
          <Item className="list-item" key={validator.account}>
            <Space size={19} direction="horizontal" className="flex align-center">
              <Avatar shape="square" size={90}></Avatar>
              <div>
                <Text className="subheader-md">{validator.name}</Text>
                <Text className="description text">{validator.description}<span><a href="_blank"> Learn More</a></span></Text>
              </div>
              <Flag 
                code={validator.country} 
                width="72" 
              />
              <Text className="near-label" style={{ width: '120px' }}>
                <Text className="subheader-lg">
                  {`${validator.fees_lower/10000} - ${validator.fees_upper/10000} %`}
                </Text>
                FEES
              </Text>
              {login
              ? <Button className="btn-custom" size="large">
                Start Staking
              </Button>
              : <Button className="btn-custom" size="large" disabled>
                Login to Stake
              </Button>}
            </Space>
          </Item>
        ))}
      </List>
    </React.Fragment>
  )
};

MainContent.propTypes = {
  login: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf(PropTypes.object).isRequired,
  stakes: PropTypes.arrayOf(PropTypes.object).isRequired,
};