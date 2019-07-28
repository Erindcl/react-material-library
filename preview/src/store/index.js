
import { createStore, applyMiddleware, combineReducers,compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import appReducer from 'pages/global';
import { API } from "@/api/index"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const middlewares = [thunk.withExtraArgument({API}), middleware];

const store = createStore(
  combineReducers({ routing: routerReducer, ...appReducer }),
  process.env.NODE_ENV=='production' ? applyMiddleware(...middlewares): composeWithDevTools(applyMiddleware(...middlewares))
)
export default   store;
