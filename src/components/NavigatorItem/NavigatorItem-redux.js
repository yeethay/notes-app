import NavigatorItem from './NavigatorItem-firebase';
import { connect } from 'react-redux';

const mapStateToProps = ({ user, notesList }) => ({ user, notesList });

export default connect(mapStateToProps)(NavigatorItem);
