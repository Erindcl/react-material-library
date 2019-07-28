import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import Routers from './router';
import store from './store';
import "assets/styles/index.scss";
import "assets/styles/antd.less";
import '@babel/polyfill'

const render = Component =>
    ReactDOM.render(
      <Provider store={ store }>
      <Component />
      </Provider>,
       document.getElementById('root')
    )
render(Routers)


