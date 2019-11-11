import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewNoteButton from './NewNoteButton-view';
import Button from 'react-bootstrap/Button';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(<NewNoteButton />);

  return { wrapper };
}

describe('NewNoteButton component', () => {
  it('should render the new note button', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Button).hasClass('new-note-btn')).toBe(true);
  });
});
