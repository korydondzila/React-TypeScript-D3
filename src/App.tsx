import * as React from 'react';
import * as d3 from 'd3';
import './App.css';

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
  nodes: d3Node[];
  simulation: any;
}

// class Node extends React.Component<NodeProps, {}> {
//   render() {
//     return (
//       <circle className="node" r={5} fill={this.props.group}>
//         <title>{this.props.id}</title>
//       </circle>
//     );
//   }
// }

class Nodes extends React.Component<NodeProps, {}> {
  ref: any;
  simulation: any = this.props.simulation;

  componentDidMount() {
    const context: any = d3.select(this.ref);
    const color = d3.scaleOrdinal(d3.schemeCategory20);
    const node = context.selectAll("circle")
      .data(this.props.nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d: d3Node) {
        return color(d.group.toString());
      })
      .call(d3.drag()
          .on("start", onDragStart)
          .on("drag", onDrag)
          .on("end", onDragEnd));

    node.append("title")
      .text(function(d: d3Node) {
        return d.id;
      });

    function onDragStart(d: any) {
      if (!d3.event.active) {
        //this.simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function onDrag(d: any) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function onDragEnd(d: any) {
      if (!d3.event.active) {
        //this.simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    return <g className="nodes" ref={(ref: any) => this.ref = ref}/>;
  }
}

class Links extends React.Component<{graph: Graph, simulation: any}, {}> {
  ref: any;
  simulation: any = this.props.simulation;

  componentDidMount() {
    const context: any = d3.select(this.ref);
    const link = context
      .selectAll("line")
      .data(this.props.graph.links)
      .enter().append("line")
      .attr("stroke-width", function(d: any) {
        return Math.sqrt(d.value);
      });

    const node = d3.select(".container").select(".nodes")
      .selectAll("circle");

    this.simulation.nodes(this.props.graph.nodes).on("tick", ticked);

    function ticked() {
      link
        .attr("x1", function(d: any) {
          return d.source.x;
        })
        .attr("y1", function(d: any) {
          return d.source.y;
        })
        .attr("x2", function(d: any) {
          return d.target.x;
        })
        .attr("y2", function(d: any) {
          return d.target.y;
        });

      node
        .attr("cx", function(d: any) {
          return d.x;
        })
        .attr("cy", function(d: any) {
          return d.y;
        });
    }
  }

  render() {
    return <g className="links" ref={(ref: any) => this.ref = ref}/>;
  }
}

// class Link extends React.Component<{ value: number }, {}> {
//   render() {
//     return (
//       <line strokeWidth={Math.sqrt(this.props.value)} />
//     );
//   }
// }

interface Props {
  width: number;
  height: number;
  graph: Graph;
}

class App extends React.Component<Props, {}> {
  ref: HTMLDivElement;
  simulation: any;

  constructor(props: Props) {
    super(props);
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d: any) {
        return d.id;
      }))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2));

    this.simulation.nodes(this.props.graph.nodes);
    this.simulation.force("link").links(this.props.graph.links);
  }

  render() {
    const { width, height, graph } = this.props;
    const style = {
      width,
      height
    };

    return (
      <div style={style} ref={(ref: any) => this.ref = ref}>
        <svg className="container" width={width} height={height}>
          <Nodes nodes={graph.nodes} simulation={this.simulation}/>
          <Links graph={graph} simulation={this.simulation}/>
        </svg>
      </div>
    );
  }
}

export default App;
