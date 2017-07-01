import { shallow } from "enzyme";
import * as React from "react";
import * as d3 from "d3";
import { expect } from "chai";
import Nodes from "../src/components/nodes";
import data from "../src/miserables";

describe("Nodes", () => {
  it("renders the nodes", () => {
    const simulation = d3.forceSimulation()
      .nodes(data.nodes);
    const wrapper = shallow(<Nodes nodes={data.nodes} simulation={simulation}/>);
    expect(wrapper.children().length).to.equal(data.nodes.length);
  });
});
