import React from 'react';
import { Route,Redirect } from 'react-router-dom';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

//   const isLoggedIn = () => localStorage.getItem('JWT') ? true : false;
  const isLoggedIn = () => true;
//   const validateAuth = isUndefinedOrNull(props.validateAuth) ? true : props.validateAuth;
  const validateAuth = true
  
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          {validateAuth && !isLoggedIn() ? <Redirect to="/sign-in" /> : <Component {...matchProps} />}
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
