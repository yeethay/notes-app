import NavBar from "./NavBar-firebase";
import { connect } from "react-redux";

const mapStateToProps = ({ loggedIn }) => ({ loggedIn });

export default connect(mapStateToProps)(NavBar);
