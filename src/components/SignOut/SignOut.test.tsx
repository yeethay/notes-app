import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignOut from './SignOut-view';
import Button from 'react-bootstrap/Button';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    firebase: undefined,
    dispatch: undefined,
  };
  const wrapper = shallow(<SignOut {...props} />);

  return { wrapper };
}

describe('SignOut component', () => {
  it('should render a sign out button', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Button).text()).toEqual('Sign Out');
  });
});
