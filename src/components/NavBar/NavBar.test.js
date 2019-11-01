import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './NavBar-view';
import Navbar, { Brand, Nav } from 'react-bootstrap/Navbar';
import SignIn from '../SignIn';
import SignOut from '../SignOut';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(<NavBar />);

  return { wrapper };
}

describe('NavBar component', () => {
  it('should render the new note button', () => {
    const { wrapper } = setup();
    expect(wrapper.exists(Navbar)).toBe(true);
    expect(wrapper.find(Brand).text()).toEqual('Notes For Now');
  });

  it('should render the SignIn component if user does not exist', () => {
    const { wrapper } = setup();
    wrapper.setProps({ user: undefined });

    expect(wrapper.exists(SignIn)).toBe(true);
    expect(wrapper.exists(SignOut)).toBe(false);
  });

  it('should render the SignOut component if user exists', () => {
    const { wrapper } = setup();
    wrapper.setProps({ user: {} });

    expect(wrapper.exists(SignIn)).toBe(false);
    expect(wrapper.exists(SignOut)).toBe(true);
  });
});
