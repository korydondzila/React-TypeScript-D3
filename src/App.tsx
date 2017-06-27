import * as React from 'react';
import * as d3 from 'd3';
import './App.css';

interface Props {
  width: number;
  height: number;
  graph: Graph;
}

type d3Node = {
  id: string,
  group: number
};

type d3Link = {
  source: string,
  target: string,
  value: number
};

type Graph = {
  nodes: d3Node[],
  links: d3Link[]
};

class Node extends React.Component<{id: string, group: string}, {}> {
  render () {
    return (
      <circle r={5} fill={ d3.scaleOrdinal(d3.schemeCategory20)(this.props.group) }/>
    );
  }
}

class Link extends React.Component<{value: number}, {}> {
  render () {
    return (
      <line strokeWidth={ Math.sqrt(this.props.value) }/>
    );
  }
}

class App extends React.Component<Props, {}> {
  render() {
    const { width, height, graph } = this.props;

    // const simulation = d3.forceSimulation()
    //   .force("link", d3.forceLink().id(function(d: d3Node) {
    //     return d.id;
    //   }))
    //   .force("charge", d3.forceManyBody())
    //   .force("center", d3.forceCenter(width / 2, height / 2));

    const links = graph.links.map((link: d3Link) => {
      return <Link value={link.value}/>;
    });

    const nodes = graph.nodes.map((node: d3Node) => {
      return <Node id={node.id} group={node.group.toString()}/>;
    });

    const style = {
      width,
      height
    };

    return (
      <div style={style}>
        <svg className="container" width={width} height={height}>
          <g className="node">
            {nodes}
          </g>
          <g className="link">
            {links}
          </g>
        </svg>
      </div>
    );
  }
}

export default App;
