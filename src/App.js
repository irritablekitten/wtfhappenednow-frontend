import React, { Component } from 'react';
import firebase from 'firebase';
import config from './keys/keys';
import moment from 'moment';
import ComplexTrends from './components/ComplexTrends/ComplexTrends';
import './boilerplate-css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
  }
  

  render() {
    let daily = moment().format('LL');
    return (
      //contains simple header to show today's date based on user location, and simple footer to display credit and link to own site //these could be their own components if needed
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><em>wtf happened <strong>now?</strong></em></h1>
          <h3 className="App-sub-header">Daily U.S. news trend: {daily}</h3>
        </header>
        <div id="trends">
        <ComplexTrends db={firebase}/>
        </div>
        <footer className="App-footer">
          <p>Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">NewsAPI.org</a> & <a href="https://timdream.org/wordcloud2.js" target="_blank" rel="noopener noreferrer">Wordcloud2.js</a> - server logic on <a href="https://github.com/irritablekitten/wtfhappenednow" target="_blank" rel="noopener noreferrer">Github</a> - more projects at <a href="https://samdefazio.com" target="_blank" rel="noopener noreferrer">samdefazio.com</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
