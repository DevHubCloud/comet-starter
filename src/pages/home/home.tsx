import { Alert } from '@metrostar/comet-uswds';
import Component1 from '@src/components/component1/component1';
import Component2 from '@src/components/component2/component2';
import Component3 from '@src/components/component3/component3';
import Component4 from '@src/components/component4/component4';
import Component5 from '@src/components/component5/component5';
import { getDisplayName } from '@src/utils/auth';
import React from 'react';
import useAuth from '../../hooks/use-auth';

export const Home = (): React.ReactElement => {
  const { isSignedIn, currentUserData } = useAuth();
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>
            Welcome{' '}
            {currentUserData ? getDisplayName(currentUserData) : 'Guest'}
          </h1>
        </div>
      </div>
      {!isSignedIn && (
        <div className="grid-row">
          <div className="grid-col">
            <Alert id="sign-in-alert" type="info">
              You are not currently signed in. Please Sign In to access the
              Dashboard.
            </Alert>
          </div>
        </div>
      )}
      <div>
        <Component1 />
        <Component2 />
        <Component3 />
        <Component4 />
        <Component5 />
      </div>
    </div>
  );
};
