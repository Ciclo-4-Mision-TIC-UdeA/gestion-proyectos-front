import { useUser } from 'context/userContext';
import React from 'react';

const PrivateComponent = function ({ roleList, children }) {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return <></>;
};

export default PrivateComponent;
