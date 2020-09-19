import React from "react";
import { Home } from './modules/Home/views/Home';
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components/RouteWithLayout";
import { Main } from "./layouts/Main";
import { PropertyPage } from "./modules/PropertyList/views/PropertyPage";
import Signinform from "./modules/Authentication/SigninForm";
import Signupform from "./modules/Authentication/SignupForm";
import { Mybookings } from "./modules/ManageBookings/views/MyBookings";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <RouteWithLayout
        component={Home}
        layout={Main}
        path="/home"
      />
      <RouteWithLayout
        component={Signinform}
        layout={Main}
        path="/signin"
      />
      <RouteWithLayout
        component={Signupform}
        layout={Main}
        path="/signup"
      />
      <RouteWithLayout
        component={PropertyPage}
        layout={Main}
        path="/property/:propertyId"
      />
      <RouteWithLayout
        component={Mybookings}
        layout={Main}
        path="/mybookings"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
