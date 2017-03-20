import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import PushFoldScreen from './PushFoldScreen';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Push or Fold" />
          <PushFoldScreen />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
