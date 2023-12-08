import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { URL_HOST } from '../../lib/helper';
import axios from 'axios';
import "./addBukti.css";

const AddBukti = () => {
    const {id} = useParams();
    const [file, setFile] = useState({
        dataSiswaId: id,
        ijazah_sk: '',
        kartu_keluarga: '',
        akta_kelahiran: '',
        SS_lulus_dapodik: '',
    });
    const navigate = useNavigate();

    const handleFileChange = async(e) => {
        const { name, files } = e.target;
        setFile((prevFileState) => ({
            ...prevFileState,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataForApi = new FormData();
        formDataForApi.append('dataSiswaId', file.dataSiswaId);
        formDataForApi.append('ijazah_sk', file.ijazah_sk);
        formDataForApi.append('kartu_keluarga', file.kartu_keluarga);
        formDataForApi.append('akta_kelahiran', file.akta_kelahiran);
        formDataForApi.append('SS_lulus_dapodik', file.SS_lulus_dapodik);

        try {
            await axios.post(`${URL_HOST}/bukti`, formDataForApi,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            // Reset form data setelah data di submit
            setFile({
                dataSiswaId: '',
                ijazah_sk: '',
                kartu_keluarga: '',
                akta_kelahiran: '',
                SS_lulus_dapodik: '',
            });
            navigate("/dashboard");
            alert("selamat Kamu telah berhasi melakukan Pendaftaran");
            } catch (error) {
            console.error('Error submitting data:', error.message);
        }
    };

    return (
        <div className='addbukti-container'>
            <div className="addbukti-navbar">
                <h2 className="addbukti-judul">Formulir Pendaftaran PPDB</h2>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='addbukti-form'>
            <h2 className="addbukti-judul-form">Form 4 : Bukti Pendaftaran</h2>
                <div className='bukti-input-box'>
                    <label className="bukti-label">Siswa ID</label>
                    <input type='text' name="dataSiswaId" className="bukti-input-id" value={id} readOnly />
                </div>
                <div className="bukti-file-container">
                    {/* INPUT UNTUL FILE IJAZAH */}
                    <div className="bukti-file">
                        <label className='bukti-label'> Ijazah SK : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="ijazah_sk" onChange={handleFileChange} /></label>
                        {file.ijazah_sk && (
                            <figure>
                                <img src={URL.createObjectURL(file.ijazah_sk)} alt="Ijazah SK" />
                                <figcaption>Ijazah SK</figcaption>
                            </figure>
                        )}
                    </div>
                    {/* INPUT UNTUK FILE KARTU KELUARGA */}
                    <div className="bukti-file">
                        <label className='bukti-label'>Kartu Keluarga : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="kartu_keluarga" onChange={handleFileChange} /></label>
                        {file.kartu_keluarga && (
                            <figure>
                                <img src={URL.createObjectURL(file.kartu_keluarga)} alt="Kartu Keluarga" />
                                <figcaption>Kartu Keluarga</figcaption>
                            </figure>
                        )}
                    </div>
                    {/* INPUT UNTUK FILE AKTA KELAHIRAN */}
                    <div className="bukti-file">
                        <label className='bukti-label'>Akta Kelahiran : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="akta_kelahiran" onChange={handleFileChange}/></label>
                        {file.akta_kelahiran && (
                        <figure>
                            <img src={URL.createObjectURL(file.akta_kelahiran)} alt="Akta Kelahiran" />
                            <figcaption>Akta Kelahiran</figcaption>
                        </figure>
                        )}
                    </div>
                    {/* INPUT UNTUK FILE SS LULUS DARI DAPODIK */}
                    <div className="bukti-file">
                        <label className='bukti-label'>ScreenShoot Lulus Dari Dapodik : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="SS_lulus_dapodik" onChange={handleFileChange}/></label>
                        {file.SS_lulus_dapodik && (
                            <figure>
                                <img src={URL.createObjectURL(file.SS_lulus_dapodik)} alt="SS Lulus Dapodik" />
                                <figcaption>SS Lulus Dapodik</figcaption>
                            </figure>
                        )}
                    </div>
                </div>

                <button type="submit" className='btnadd'>Submit Data</button>
            </div>
            </form>
        </div>
    );
};

export default AddBukti;
