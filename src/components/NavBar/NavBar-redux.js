import NavBar from './NavBar-firebase';
import { connect } from 'react-redux';

const mapStateToProps = user => user;

export default connect(mapStateToProps)(NavBar);
