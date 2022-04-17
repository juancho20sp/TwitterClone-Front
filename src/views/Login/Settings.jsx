import React, { useEffect, useContext, useState } from 'react';
import { AccountContext } from './Account';

import { ChangePassword } from '../';

export default () => {
  const { getSession } = useContext(AccountContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getSession().then(() => {
      setIsLoggedIn(true);
    });
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <>
          <h2>Settings</h2>
          <ChangePassword />
        </>
      )}
    </div>
  );
};

// const Settings = () => {
//   return <div>Settings</div>;
// };

// export default Settings;
