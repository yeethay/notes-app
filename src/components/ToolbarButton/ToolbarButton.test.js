import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ToolbarButton from '.';
import { ic_format_bold } from '../../utils/icons';
import Icon from 'react-icons-kit';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    active: false,
    onPointerDown: jest.fn(),
    icon: ic_format_bold,
  };
  const wrapper = shallow(<ToolbarButton {...props} />);

  return { wrapper };
}

describe('ToolbarButton component', () => {
  it('should render a Button with an Icon', () => {
    const { wrapper } = setup();
    expect(wrapper.find('button').hasClass('tooltip-icon-button')).toBe(true);
    expect(wrapper.exists(Icon)).toBe(true);
  });

  it('should set css class when active', () => {
    const { wrapper } = setup();
    expect(wrapper.find('button').hasClass('active')).toBe(false);
    wrapper.setProps({
      active: true,
    });
    expect(wrapper.find('button').hasClass('active')).toBe(true);
  });
});
