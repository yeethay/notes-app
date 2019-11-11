import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoteEditor from './NoteEditor-view';
import NoteTitle from '../NoteTitle';
import NoteToolbar from '../NoteToolbar';
import initialValue from '../../utils/slate/initialValue';
import uuid from 'uuid/v4';

Enzyme.configure({ adapter: new Adapter() });

function setup(props) {
  const wrapper = shallow(<NoteEditor {...props} />);

  return { wrapper };
}

const defaultNote = ({ title, active }) => {
  return {
    data: {
      title,
      preview: '',
      value: initialValue,
    },
    active,
  };
};

describe('NoteEditor component', () => {
  it('should render the toolbar, title', () => {
    const props = {
      notesList: {
        [uuid()]: defaultNote({ title: '', active: true }),
      },
      currentNoteIndex: 0,
    };
    const { wrapper } = setup(props);
    expect(wrapper.exists(NoteToolbar)).toBe(true);
    expect(wrapper.exists(NoteTitle)).toBe(true);
  });

  it('should update the title when the active note changes', () => {
    const props = {
      notesList: {
        first: defaultNote({ title: 'one', active: true }),
        second: defaultNote({ title: 'two', active: false }),
      },
    };
    const { wrapper } = setup(props);
    expect(wrapper.find(NoteTitle).props('text').text).toEqual('one');

    wrapper.setProps({
      notesList: {
        first: defaultNote({ title: 'one', active: false }),
        second: defaultNote({ title: 'two', active: true }),
      },
    });
    expect(wrapper.find(NoteTitle).props('text').text).toEqual('two');
  });
});
