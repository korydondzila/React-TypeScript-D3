import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App
    width={window.screen.availWidth}
    height={window.screen.availHeight} />,
  document.getElementById('root')
);
