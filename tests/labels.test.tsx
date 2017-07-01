import { shallow } from "enzyme";
import * as React from "react";
import { expect } from "chai";
import Labels from "../src/components/labels";
import data from "../src/miserables";

describe("Labels", () => {
  it("renders the labels", () => {
    const wrapper = shallow(<Labels nodes={data.nodes}/>);
    expect(wrapper.children().length).to.equal(data.nodes.length);
  });
});
