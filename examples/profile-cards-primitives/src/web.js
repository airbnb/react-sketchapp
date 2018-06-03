import * as React from 'react';
import Profile from './components/Profile';
import Space from './components/Space';
import { spacing } from './designSystem';
import DATA from './data';

/*
 * <Profile /> is defined with platform-independent components
 * from react-primitives. We can use it in our web UI, and
 * continue to use primitives, or mix them with DOM elements
 */
export default () => (
  <div>
    <h1 style={{ fontFamily: "'SF UI Display', 'San Francisco'" }}>Cross-platform components!</h1>
    <p style={{ fontFamily: "'SF UI Text', 'San Francisco'", maxWidth: '28em', lineHeight: 1.5 }}>
      &lt;Profile /&gt; is defined with platform-independent components from react-primitives. We
      can use it in our web UI, and continue to use primitives, or mix them with DOM elements
    </p>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {DATA.map(user => (
        <Space h={spacing} v={spacing}>
          <Profile key={user.screen_name} user={user} />
        </Space>
      ))}
    </div>
  </div>
);
