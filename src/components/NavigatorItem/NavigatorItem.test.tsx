import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigatorItem from './NavigatorItem-view';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    title: 'A title',
    preview: 'A preview',
    active: true,
    dispatch: undefined,
    user: undefined,
    notesList: undefined,
    firebase: undefined,
    id: undefined,
  };
  const wrapper = shallow(<NavigatorItem {...props} />);

  return { props, wrapper };
}

describe('NavigatorItem component', () => {
  it('should render the title and the preview', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').hasClass('navigator-item active')).toBe(true);
    expect(wrapper.find('h4').text()).toBe('A title');
    expect(wrapper.find('p').text()).toBe('A preview');
  });

  it('should render remove the active class if inactive', () => {
    const { wrapper } = setup();
    wrapper.setProps({ active: false });
    expect(wrapper.find('div').hasClass('active')).toBe(false);
  });
});
