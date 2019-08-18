import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NoteEditor from "./NoteEditor-view";
import NoteTitle from "../NoteTitle";
import NoteToolbar from "../NoteToolbar";
import initialValue from "../../utils/slate/initialValue";

Enzyme.configure({ adapter: new Adapter() });

function setup(props) {
  const wrapper = shallow(<NoteEditor {...props} />);

  return { wrapper };
}

describe("NoteEditor component", () => {
  it("should render the toolbar, title", () => {
    const props = {
      notesList: [
        { title: "", preview: "", value: initialValue, active: true, id: 0 }
      ],
      currentNoteIndex: 0
    };
    const { wrapper } = setup(props);
    expect(wrapper.exists(NoteToolbar)).toBe(true);
    expect(wrapper.exists(NoteTitle)).toBe(true);
  });

  it("should update the title when the active note changes", () => {
    const props = {
      notesList: [
        { title: "one", preview: "", value: initialValue, active: true, id: 0 },
        { title: "two", preview: "", value: initialValue, active: false, id: 1 }
      ],
      currentNoteIndex: 0
    };
    const { wrapper } = setup(props);
    expect(wrapper.find(NoteTitle).props("text").text).toEqual("one");
    wrapper.setProps({ currentNoteIndex: 1 });
    expect(wrapper.find(NoteTitle).props("text").text).toEqual("two");
  });
});
