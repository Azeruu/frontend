import {useState} from 'react';
import "./ListUser.css";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { URL_HOST } from '../../lib/helper';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Admin');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveUser = async (e) =>{
        e.preventDefault();
        try {
            await axios.post(`${URL_HOST}/users`,{
                username : username,
                email : email,
                password : password,
                confirmPassword : confirmPassword,
                role : role
            });
            navigate("/userlist");
        } catch (error) {
            if (error.response){
              setMsg(error.response.data.msg)
            }
        }
    }

  return (
    <div className="add-user-column">
      <div className="form-column">
        <h1 className="add-user-judul">Tambah User</h1>
        <form onSubmit={saveUser}>
          <p>{msg}</p>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
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
                value={email}
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
                value={password}
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
                value={confirmPassword}
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
                  value={role}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser