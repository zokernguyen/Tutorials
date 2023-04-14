import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth?.login.currentUser);
  // `user` is assigned the value of the `currentUser` property from the `login` object in the Redux store. The "?." operator is used to check if object property (reading currentUser in login state object) is available or not; if not, ignore this line of code and execute next line. Prevent app crash when user not yet login to the app.
  const id = user?._id;
  const accessToken = user?.accessToken;

  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  const handleLogout = () => {
    logout(dispatch, id, navigate, accessToken, axiosJWT)
  }

  return (
    // The navbar renders different links depending on whether the user is logged in or not. If the user is logged in, the navbar shows a greeting and a logout link. If the user is not logged in, the navbar shows a login and a register link.

    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>

      {user ? (
        <>
          <p className="navbar-user">Hi, <span> {user?.username}  </span> </p>
          <Link
            to="/logout"
            className="navbar-logout"
            onClick={handleLogout}
          > Log out</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login"> Login </Link>
          <Link to="/register" className="navbar-register"> Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
