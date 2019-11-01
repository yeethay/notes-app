import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoteToolbar from './NoteToolbar-view';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {};
  const wrapper = shallow(<NoteToolbar {...props} />);

  return { props, wrapper };
}

describe('NoteToolbar component', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.format-toolbar')).toBeDefined();
  });
});
