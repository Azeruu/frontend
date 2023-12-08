import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { URL_HOST } from "../../lib/helper";

const EditUser = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const [user, setUser] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:''
  });

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`${URL_HOST}/users/${id}`);
        setUser(response.data);

      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const setUsername = (newValue) => {
    setUser({ ...user, username: newValue });
  };
  const setEmail = (newValue) => {
    setUser({ ...user, email: newValue });
  };
  const setPassword = (newValue) => {
    setUser({ ...user, password: newValue });
  };
  const setConfirmPassword = (newValue) => {
    setUser({ ...user, confirmPassword: newValue });
  };
  const setRole = (newValue) => {
    setUser({ ...user, role: newValue });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${URL_HOST}/users/${id}`, {
        username: user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        role: user.role,
      });
      navigate("/userlist");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="edit-user-column">
      <div className="form-column">
        <h1 className="edit-user-judul">Edit User</h1>
        <form onSubmit={updateUser}>
          <p>{msg}</p>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={user.username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input"
                value={user.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={user.password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={user.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <div className="select">
                <select
                  className="option"
                  value={user.role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
          <div className="btn-field">
            <Link to={`/userlist`} className="action-btn">
              Kembali
            </Link>
            <button type="submit" className="action-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
