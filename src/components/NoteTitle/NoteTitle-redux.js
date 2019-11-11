import NoteTitle from './NoteTitle-view';
import { connect } from 'react-redux';

const mapStateToProps = notesList => notesList;

export default connect(mapStateToProps)(NoteTitle);
