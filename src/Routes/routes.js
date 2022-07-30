import React, { useContext } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { usercontext } from 'Hooks/Authcontext/Authcontext';

const Routes = () => {
  const { isLoggedIn } = useContext(usercontext)
  return (
    <HashRouter>
      {
        isLoggedIn ? (
          <Switch>
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from={`/`} to='/admin/dashboard' />
          </Switch>
        ) : (
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Redirect from={`/`} to='/auth/signin' />
          </Switch>
        )
      }

    </HashRouter>
  )
}

export default Routes