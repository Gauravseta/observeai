import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Dashboard from './containers/Dashboard'
import './App.css';
import store from './store';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

class App extends Component {
  render() {
    return (

     <Provider store={store}>
        <Dashboard>
        </Dashboard>
     </Provider>
    );
  }
}

export default App;
