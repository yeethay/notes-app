import NoteTitle from './NoteTitle-view';
import { connect } from 'react-redux';
import { INotesList } from '../../interfaces';

interface IState {
  notesList: INotesList;
}
const mapStateToProps = ({ notesList }: IState) => ({ notesList });

export default connect(mapStateToProps)(NoteTitle);
