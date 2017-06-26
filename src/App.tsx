import * as React from 'react';
//import * as d3 from 'd3';
import './App.css';

interface Props {
  width: number;
  height: number;
}

class App extends React.Component<Props, {}> {

  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height,
      backgroundColor: '#333'
    };

    return <div style={style} />;
  }
}

export default App;
