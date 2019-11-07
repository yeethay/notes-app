import Navigator from './Navigator-view';
import { connect } from 'react-redux';

const mapStateToProps = ({ notesList, user }) => ({ notesList, user });
export default connect(mapStateToProps)(Navigator);
