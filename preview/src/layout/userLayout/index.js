import React from 'react';
import './style.scss';

export default class UserLayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  logout() {
  }


  render() {
   
    return  <div className="user-content">{this.props.children}</div>
  }
}
