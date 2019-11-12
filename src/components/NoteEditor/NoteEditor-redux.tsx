import NoteEditor from './NoteEditor-firebase';
import { connect } from 'react-redux';
import { INotesList } from '../../interfaces';

interface IState {
  notesList: INotesList;
  user: firebase.User;
  synced: boolean;
}

const mapStateToProps = ({ notesList, user, synced }: IState) => ({
  notesList,
  user,
  synced,
});

export default connect(mapStateToProps)(NoteEditor);
