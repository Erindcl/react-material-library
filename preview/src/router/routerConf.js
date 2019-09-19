import TopLayout  from 'layout/topLayout';
import MainLayout  from 'layout/mainLayout';
import UserLayout  from 'layout/userLayout';
import Home from 'pages/home';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import ComponentView from '../../src/pages/componentView';

const routerConf = [
  { 
    path: '/component-view',
    layout: MainLayout,
    component: ComponentView,
    children:[],
  }, 
  { 
    path: '/',
    layout: MainLayout,
    component: Home,
    children:[],
  }, 
];

export default routerConf;
