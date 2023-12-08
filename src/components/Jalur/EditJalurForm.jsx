import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { URL_HOST } from "../../lib/helper";

const EditJalur = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const [jalur, setJalur] = useState('');

    useEffect(() => {
        const getJalurById = async () => {
        try {
            const response = await axios.get(`${URL_HOST}/jalur/${id}`);
            setJalur(response.data);
        } catch (error) {
            if (error.response) {
            setMsg(error.response.data.msg);
            }
        }
        };
        getJalurById();
    }, [id]);
    const setJalurBaru = (newValue) => {
        setJalur({ ...jalur, nama_jalur: newValue });
    };

    const updateJalur = async (e) => {
        e.preventDefault();
        try {
        await axios.patch(`${URL_HOST}/jalur/${id}`, {
            nama_jalur: jalur.nama_jalur,
        });
        navigate("/jalur");
        } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
        }
    };

    return (
        <div className="edit-jalur-column">
        <div className="form-column">
            <h1 className="edit-jalur-judul">Edit Jalur</h1>
            <form onSubmit={updateJalur}>
            <p>{msg}</p>
            <div className="field">
                <label className="label">Nama Jalur</label>
                <div className="control">
                <input
                    type="text"
                    className="input"
                    value={jalur.nama_jalur}
                    onChange={(e) => setJalurBaru(e.target.value)}
                    placeholder="Nama Jalur"
                ></input>
                </div>
            </div>
            <div className="btn-field">
                <Link to={`/jalur`} className="action-btn">
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

export default EditJalur;
