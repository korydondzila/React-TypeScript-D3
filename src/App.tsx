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

interface NodeProps {
  id: string;
  group: string;
  onDragStart: (d: any) => any;
}

class Node extends React.Component<NodeProps, {}> {
  render() {
    return (
      <circle className="node" r={5} fill={this.props.group} 
        onDragStart={this.props.onDragStart(this)}>
        <title>{this.props.id}</title>
      </circle>
    );
  }
}

class Link extends React.Component<{ value: number }, {}> {
  render() {
    return (
      <line strokeWidth={Math.sqrt(this.props.value)} />
    );
  }
}

class App extends React.Component<Props, {}> {
  render() {
    const { width, height, graph } = this.props;

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d: d3Node) {
        return d.id;
      }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const links = graph.links.map((link: d3Link, index: number) => {
      return <Link key={index} value={link.value} />;
    });

    const nodes = graph.nodes.map((node: d3Node, index: number) => {
      return <Node key={index} id={node.id} group={color(node.group.toString())} 
        onDragStart={(d) => dragstarted(d)}/>;
    });

    const asdf = d3.selectAll(".node").call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
    );

    console.log("nodes", asdf.order);

    //simulation.force("link")
    //  .links(graph.links);
    // simulation.nodes(graph.nodes)
    //   .on("tick", ticked);

    // function ticked() {
    //   d3.selectAll(".link")
    //     .attr("x1", function (d: any) {
    //       return d.source.x;
    //     })
    //     .attr("y1", function (d: any) {
    //       return d.source.y;
    //     })
    //     .attr("x2", function (d: any) {
    //       return d.target.x;
    //     })
    //     .attr("y2", function (d: any) {
    //       return d.target.y;
    //     });

    //   d3.selectAll(".node")
    //     .attr("cx", function (d: any) {
    //       return d.x;
    //     })
    //     .attr("cy", function (d: any) {
    //       return d.y;
    //     });
    // }

    function dragstarted(d: any) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d: any) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d: any) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    const style = {
      width,
      height
    };

    return (
      <div style={style}>
        <svg className="container" width={width} height={height}>
          <g className="nodes">
            {nodes}
          </g>
          <g className="links">
            {links}
          </g>
        </svg>
      </div>
    );
  }
}

export default App;
