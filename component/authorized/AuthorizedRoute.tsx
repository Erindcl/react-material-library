import { Route,Redirect } from 'react-router-dom';
import * as React from 'react';
import Authorized from './Authorized';
import { IAuthorityType } from './CheckPermissions';

interface AuthorizedRoutePops {
  currentAuthority?: string;
  component?: React.ComponentClass<any, any>;
  render?: (props: any) => React.ReactNode;
  redirectPath?: string;
  authority: IAuthorityType;
  [propName: string]: any;
}

const AuthorizedRoute: React.SFC<AuthorizedRoutePops> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
  >
    <Route
      {...rest}
      render={(props: any) => (Component ? <Component {...props} /> : render(props))}
    />
  </Authorized>
);

export default AuthorizedRoute;
