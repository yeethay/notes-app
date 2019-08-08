import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Toolbar from "./Toolbar";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    buttons: {
      one: {
        onPointerDown: jest.fn(),
        icon: {}
      }
    }
  };
  const wrapper = shallow(<Toolbar {...props} />);

  return { props, wrapper };
}

describe("toolbar component", () => {
  it("should render", () => {
    const { props, wrapper } = setup();
    expect(wrapper.find(".format-toolbar")).toBeDefined();
    expect(wrapper.find(".tooltip-icon-button")).toHaveLength(
      Object.keys(props.buttons).length
    );
  });
});
