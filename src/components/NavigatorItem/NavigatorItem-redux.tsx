import NavigatorItem from './NavigatorItem-firebase';
import { connect } from 'react-redux';
import { INotesList } from '../../interfaces';

interface IState {
  user: firebase.User;
  notesList: INotesList;
}
const mapStateToProps = ({ user, notesList }: IState) => ({ user, notesList });

export default connect(mapStateToProps)(NavigatorItem);
