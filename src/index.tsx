import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import data from "./miserables";

ReactDOM.render(
  <App
    width={window.screen.availWidth}
    height={window.screen.availHeight}
    graph={data}/>,
  document.getElementById('root')
);
