import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Text (props) {
  return (
    <div style={props.style} className={props.className}>
      {props.children}
    </div>
  );
}

Text.defaultProps = {
  className: "text",
}