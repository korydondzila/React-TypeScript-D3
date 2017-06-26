import { shallow } from "enzyme";
import * as React from "react";
import { expect } from "chai";
import App from "../src/App";

describe("Main App", () => {
  it("renders the correct content for app", () => {
    const wrapper = shallow(<App width={500} height={500}/>);
    expect(wrapper.children().length).to.equal(1);
  });
});
