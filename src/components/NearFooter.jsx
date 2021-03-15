import React from 'react';
import Text from './Text'

export default function NearFooter () {
  return (
    <div className="flex space-between">
      <div className="flex flex-start align-center">
        <Text>&#169; 2020 NEAR Inc.</Text>
        <Text className="separator">|</Text>
        <Text>All Rights Reserved</Text>
      </div>
      <div className="flex flex-end align-center">
        <Text>
          <a href="https://near.org/privacy/">Terms &amp; Conditions</a>
        </Text>
        <Text className="separator">|</Text>
        <Text>
          <a href="https://near.chat/">Support</a>
        </Text>
        <Text className="separator">|</Text>
        <Text>
          <a href="_blank">Learn more about NEAR</a>
        </Text>
      </div>
    </div>
  )
};
