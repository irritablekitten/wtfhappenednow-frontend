import React, { Component } from 'react';
import firebase from 'firebase';
import config from './keys/keys';
import ComplexTrends from './components/ComplexTrends';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><em>wtf happened <strong>now?</strong></em></h1>
          <h3 className="App-sub-header">U.S. news trends every hour*</h3>
        </header>
        <div id="trends">
        <ComplexTrends db={firebase}/>
        
        </div>
        <footer className="App-footer">
          <h4>*Timestamps in PDT</h4>
          <p>© 2018 Sam Defazio - more projects at <a href="https://samdefazio.com">samdefazio.com</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
