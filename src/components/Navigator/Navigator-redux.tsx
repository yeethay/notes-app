import Navigator from './Navigator-view';
import { connect } from 'react-redux';
import { INotesList } from '../../interfaces';

interface IState {
  notesList: INotesList;
  user: firebase.User;
}

const mapStateToProps = ({ notesList, user }: IState) => ({ notesList, user });
export default connect(mapStateToProps)(Navigator);
