import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LastModified from './LastModified-view';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(<LastModified />);

  return { wrapper };
}

describe('LastModified component', () => {
  it('should render the last modified component', () => {
    const { wrapper } = setup();
    wrapper.setProps({ date: 1572837327099 });
    expect(wrapper.find('p').hasClass('last-modified'));
    expect(wrapper.find('p').text()).toEqual(
      'Last modified on 11/3/2019, 8:15:27 PM'
    );
  });
});
