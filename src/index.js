import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/'
import green from '@material-ui/core/colors/green';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// import reducer from './store/reducers/reducer'
import NewsReducer from './components/layout/News/store/NewsReducer'
import User from './components/layout/Profile/User/store/User'
import globalReducer from './store/reducers/reducer'

const rootReducer = combineReducers({
  User,
  NewsReducer,
  globalReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
// const store = createStore(reducer, applyMiddleware(thunk))
const theme = createMuiTheme({
  palette: {
    primary: green,
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

