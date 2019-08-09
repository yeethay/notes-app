import NoteEditor from "./NoteEditor-view";
import { connect } from "react-redux";

const mapStateToProps = ({ notesList, currentNoteIndex }) => ({
  notesList,
  currentNoteIndex
});

export default connect(mapStateToProps)(NoteEditor);
