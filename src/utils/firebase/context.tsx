import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = (Component: any) =>
  Object.assign(
    (props: any) => (
      <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    ),
    { displayName: 'componentWithFirebase' }
  );

export default FirebaseContext;
