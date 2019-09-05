import React from 'react';
import { AppRoot } from './layouts';
import ReactNotification  from 'react-notifications-component';

//Redux
import { Provider } from 'react-redux';
import store from './redux/Store';

import 'react-notifications-component/dist/theme.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

class App extends React.Component {
 
  render() {
    return(
      <Provider store={store}>
        <ReactNotification />
        <AppRoot />
      </Provider>
    )
  }
}
 
export default App;