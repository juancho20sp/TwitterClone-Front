import React, { useState, useContext, useEffect } from 'react';

import { AccountContext } from './Account';

const Status = () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log('session', session);
      setStatus(true);
    });
  }, []);

  return (
    <div>
      {status ? <button onClick={logout}>Logout</button> : 'Please log in'}
    </div>
  );
};

export default Status;
