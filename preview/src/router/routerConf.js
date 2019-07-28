
import TopLayout  from 'layout/topLayout';
import MainLayout  from 'layout/mainLayout';
import UserLayout  from 'layout/userLayout';
import Home from 'pages/home';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: MainLayout,
    component: Home,
    children:[
    ]
  },
  {
   path:'/login',
   layout: UserLayout,
   component: Login,
  },
  {
    path:'/register',
    layout: UserLayout,
    component: Register,
   },
		{
		path: '*',
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
