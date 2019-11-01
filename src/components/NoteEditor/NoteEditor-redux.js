import NoteEditor from './NoteEditor-firebase';
import { connect } from 'react-redux';

const mapStateToProps = ({ notesList, user }) => ({ notesList, user });

export default connect(mapStateToProps)(NoteEditor);
