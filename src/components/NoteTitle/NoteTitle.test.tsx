import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoteTitle from './NoteTitle-view';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    text: 'Some text',
    notesList: undefined,
    dispatch: undefined,
  };
  const wrapper = shallow(<NoteTitle {...props} />);

  return { props, wrapper };
}

describe('NoteTitle component', () => {
  it('should render a text area with some text', () => {
    const { props, wrapper } = setup();
    expect(wrapper.find('textarea').prop('value')).toEqual(props.text);
  });
});
