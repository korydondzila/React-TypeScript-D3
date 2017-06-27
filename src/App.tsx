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

// interface NodeProps {
//   id: string;
//   group: string;
// }

// class Node extends React.Component<NodeProps, {}> {
//   render() {
//     return (
//       <circle className="node" r={5} fill={this.props.group}>
//         <title>{this.props.id}</title>
//       </circle>
//     );
//   }
// }

// class Link extends React.Component<{ value: number }, {}> {
//   render() {
//     return (
//       <line strokeWidth={Math.sqrt(this.props.value)} />
//     );
//   }
// }

class App extends React.Component<Props, {}> {
  divRef: HTMLDivElement;
  //simulation: any;

  componentDidMount() {
    const context = this.setContext();
    this.addNodesDragEvents(context);
  }

  setContext() {
    return d3.select(this.divRef).select(".container");
  }

  addNodesDragEvents(context: any) {
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const simulation: any = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d: any) {
        return d.id;
      }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2));

    var link = context.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.props.graph.links)
      .enter().append("line")
      .attr("stroke-width", function(d: any) {
        return Math.sqrt(d.value);
      });

    console.log("links", link);

    const node = context.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.props.graph.nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d: d3Node) {
        return color(d.group.toString());
      })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    node.append("title")
      .text(function(d: d3Node) {
        return d.id;
      });
    // const nodes = d3.selectAll(".node").call(d3.drag()
    //   .on("start", dragstarted)
    //   .on("drag", dragged)
    //   .on("end", dragended)
    // );

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

    console.log(node);
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

    simulation.nodes(this.props.graph.nodes).on("tick", ticked);
    simulation.force("link").links(this.props.graph.links);
    simulation.force("charge").strength(-100);
  }

  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height
    };

    //const color = d3.scaleOrdinal(d3.schemeCategory20);
    // this.simulation = d3.forceSimulation()
    //   .force("link", d3.forceLink().id(function(d: any) {
    //     return d.id;
    //   }))
    //   .force("charge", d3.forceManyBody())
    //   .force("center", d3.forceCenter(width / 2, height / 2));

    // const links = graph.links.map((link: d3Link, index: number) => {
    //   return <Link key={index} value={link.value}/>;
    // });
    
    // const nodes = graph.nodes.map((node: d3Node, index: number) => {
    //   return <Node key={index} id={node.id} group={color(node.group.toString())}/>;
    // });

    return (
      <div style={style} ref={(mountPoint: any) => this.divRef = mountPoint}>
        <svg className="container" width={width} height={height}>
          {/*<g className="nodes">
            {nodes}
          </g>
          <g className="links">
            {links}
          </g>*/}
        </svg>
      </div>
    );
  }
}

export default App;
