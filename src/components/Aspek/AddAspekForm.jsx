import {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { URL_HOST } from '../../lib/helper';
import Sidebar from '../NavSide/Sidebar';
import Navbar from '../NavSide/Navbar';
import ArrowLeft from "feather-icons-react/build/IconComponents/ArrowLeft";
import "./AddAspek.css";

const AddAspek = () => {
    const [jalur, setJalur] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveUser = async (e) =>{
        e.preventDefault();
        try {
            await axios.post(`${URL_HOST}/jalur`,{
                nama_jalur : jalur,
            });
            navigate("/aspek");
        } catch (error) {
            if (error.response){
              setMsg(error.response.data.msg)
            }
        }
    }

  return (
    <div className="aspek-form">
      <Navbar />
      <Sidebar />
      <Link to="/aspek" className="btn-back-1">
        <ArrowLeft />
      </Link>
      <div className="column">
        <h1 className="daftaruser">Tambah Jalur</h1>
        <form onSubmit={saveUser}>
          <p>{msg}</p>
          <div className="field">
            <label className="label">Nama Jalur</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={jalur}
                onChange={(e) => setJalur(e.target.value)}
                placeholder="Jalur Masuk"
              ></input>
            </div>
          </div>
          
          <div className="field">
            <Link to={`/aspek`} className="save">
              Kembali
            </Link>
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAspek