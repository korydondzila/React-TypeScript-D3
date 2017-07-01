import * as React from "react";
import * as d3 from "d3";
import { d3Types } from "../types";

class Link extends React.Component<{ link: d3Types.d3Link }, {}> {
  ref: SVGLineElement;

  componentDidMount() {
    d3.select(this.ref).data([this.props.link]);
  }

  render() {
    return <line className="link" ref={(ref: SVGLineElement) => this.ref = ref}
      strokeWidth={Math.sqrt(this.props.link.value)} />;
  }
}

export default class Links extends React.Component<{ links: d3Types.d3Link[] }, {}> {
  render() {
    const links = this.props.links.map((link: d3Types.d3Link, index: number) => {
      return <Link key={index} link={link} />;
    });

    return (
      <g className="links">
        {links}
      </g>
    );
  }
}
