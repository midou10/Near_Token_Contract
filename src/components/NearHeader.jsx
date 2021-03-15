import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Space, Dropdown, Button } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import nearlogo from '../assets/gray_near_logo.svg';
const { Item } = Menu;

export default function NearHeader ({ 
  title, 
  login, 
  requestSignIn, 
  requestSignOut, 
  accountId,
  balance,
}) {
  const menu = (
    <Menu>
      <Item>Settings</Item>
      <Item>Switch Accounts</Item>
      <Item onClick={requestSignOut}>Logout</Item>
  </Menu>
  );

  return (
    <div className="header flex space-between align-center">
      <div className="flex flex-start align-center">
        <img className="logo" src={nearlogo} alt="NEAR logo" />
        <h2>{title}</h2>
      </div>
      <div className="flex flex-end align-center">
        {login &&
          <Space size={39}>
            <Button type="link">
              My Dashboard
            </Button>
            <Dropdown.Button
              className="flex align-center"
              icon={<CaretDownFilled />}
              overlay={menu}
            >
              @{accountId} | &#9411; {Number.parseFloat(balance).toFixed(4)}
            </Dropdown.Button>
          </Space>
        }
        {!login &&
          <Button 
            className="btn-custom"
            id="login"
            type="primary"
            size="large"
            onClick={requestSignIn}
          >
            Login with NEAR
          </Button>
        }
      </div>
    </div>
  );
}

NearHeader.propTypes = {
  title: PropTypes.string.isRequired,
  login: PropTypes.bool.isRequired,
  requestSignIn: PropTypes.func,
};