import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NoteEditor from "./NoteEditor-view";
import NoteTitle from "../NoteTitle";
import NoteToolbar from "../NoteToolbar";
import Editor from "slate-react";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    notesList: [{ title: "", preview: "", active: true, id: 0 }],
    currentNoteIndex: 0
  };
  const wrapper = shallow(<NoteEditor {...props} />);

  return { wrapper };
}

describe("NoteEditor component", () => {
  it("should render the toolbar, title", () => {
    const { wrapper } = setup();
    expect(wrapper.exists(NoteToolbar)).toBe(true);
    expect(wrapper.exists(NoteTitle)).toBe(true);
  });

  it("should update the title when the active note changes", () => {
    const { wrapper } = setup();
    wrapper.setProps({
      notesList: [
        { title: "one", preview: "", active: true, id: 0 },
        { title: "two", preview: "", active: false, id: 1 }
      ],
      currentNoteIndex: 0
    });
    expect(wrapper.find(NoteTitle).props("text").text).toEqual("one");
    wrapper.setProps({ currentNoteIndex: 1 });
    expect(wrapper.find(NoteTitle).props("text").text).toEqual("two");
  });
});
