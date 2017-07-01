import { shallow } from "enzyme";
import * as React from "react";
import { expect } from "chai";
import Links from "../src/components/links";
import data from "../src/miserables";

describe("Links", () => {
  it("renders the links", () => {
    const wrapper = shallow(<Links links={data.links}/>);
    expect(wrapper.children().length).to.equal(data.links.length);
  });
});
