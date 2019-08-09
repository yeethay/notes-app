import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignOut from "./SignOut-view";
import Button from "react-bootstrap/Button";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(<SignOut />);

  return { wrapper };
}

describe("SignOut component", () => {
  it("should render a sign out button", () => {
    const { wrapper } = setup();
    expect(wrapper.find(Button).text()).toEqual("Sign Out");
  });
});
