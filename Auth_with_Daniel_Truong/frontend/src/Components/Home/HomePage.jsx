import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector(state => state.user.users?.allUsers);
  const user = useSelector(state => state.auth.login?.currentUser);

  const msg = useSelector(state => state.user?.msg);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };

  //load user state in redux store to render all users
  useEffect(() => {

    if (!user) {
      navigate("/login")
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT)
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role is: ${user?.admin ? `Admin` : `Basic user`}`}
      </div>
      <div className="home-userlist">
        {
          Array.isArray(userList) ?
            userList?.map((user) => {

              return (
                <div className="user-container">
                  <div className="home-user">{user.username}</div>
                  <div
                    className="delete-user"
                    onClick={() => handleDelete(user._id)}
                  > Delete </div>
                </div>
              );
            }) : "No users found."
        }
      </div>
      {msg}
    </main>
  );
};

export default HomePage;
