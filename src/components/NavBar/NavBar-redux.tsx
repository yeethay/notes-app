import NavBar from './NavBar-view';
import { connect } from 'react-redux';

interface IState {
  user: firebase.User;
}

const mapStateToProps = ({ user }: IState) => ({ user });

export default connect(mapStateToProps)(NavBar);
