import React, { Component } from 'react';
import Home from './containers/Home/Home';
import Character from './containers/Character/Character';
import Layout from './hoc/Layout/Layout';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Navbar />
          <Switch>
            <Route path = "/character" component = {Character} />
            <Route path = "/" component = {Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
