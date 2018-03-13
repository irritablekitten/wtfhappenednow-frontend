import React from 'react';
import ReactDOM from 'react-dom';
import './boilerplate-css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
