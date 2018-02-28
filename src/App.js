import React, { Component } from 'react';
import firebase from 'firebase';
import config from './keys/keys';
import moment from 'moment';
import ComplexTrends from './components/ComplexTrends';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
  }
  

  render() {
    let daily = moment().format('LL');
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><em>wtf happened <strong>now?</strong></em></h1>
          <h3 className="App-sub-header">Daily U.S. news trend: {daily}</h3>
        </header>
        <div id="trends">
        <ComplexTrends db={firebase}/>
        
        </div>
        <footer className="App-footer">
          <p>Powered by <a href="https://newapi.org">NewsAPI.org</a> - server logic on <a href="https://github.com/irritablekitten/wtfhappenednow">Github</a> - more projects at <a href="https://samdefazio.com">samdefazio.com</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
