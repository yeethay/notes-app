import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './SignIn-view';
import Button from 'react-bootstrap/Button';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    firebase: undefined,
  };

  const wrapper = shallow(<SignIn {...props} />);

  return { wrapper };
}

describe('SignIn component', () => {
  it('should render a sign in button', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Button).text()).toEqual('Sign In');
  });
});
