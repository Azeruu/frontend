import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IMAGE_URL, URL_HOST } from "../../lib/helper"
import "./bukti.css";

const ListBukti = () => {
    // const {id} = useParams();
    const [bukti, setBukti] = useState([]);
    const [jmlData, setJmlData] = useState(0);

    useEffect(() => {
        getBukti();
    }, []);
    useEffect(() => {
        jumlahData();
    }, []);

    // Batas
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(bukti.length / itemsPerPage);

    const handleClick = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        } else if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = bukti.slice(startIndex, endIndex);
    
  // Batas

    const getBukti = async () => {
        try {
        const response = await axios.get(`${URL_HOST}/bukti`);
        setBukti(response.data);
        } catch (error) {
        console.log('Error fetching data:', error.message);
        }
    };
    const hapusBukti = async (dataSiswaId) => {
        try {
            await axios.delete(`${URL_HOST}/bukti/${dataSiswaId}`);
            getBukti();
            } catch (error) {
            console.log(error);
            }
    };
    const jumlahData = async () => {
        try {
        const response = await axios.get(`${URL_HOST}/bukti`);
        setJmlData(response.data.length);
        } catch (error) {
        console.log(error);
        }
    };

    return (
    <div className="bukti-container">
        <div className="bukti-grid">
            <h1 className="bukti-judul">Berkas Bukti Pendaftaran </h1>
            <p className="bukti-subjudul">Berkas Berkas yang dijadikan bukti pendaftarn </p>
            <div className="bukti-table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID Bukti</th>
                        <th>Siswa ID</th>
                        <th>Ijazah/Surat Keterangan lulus</th>
                        <th>kartu Keluarga</th>
                        <th>Akta Kelahiran</th>
                        <th>Screenshoot Lulus dari DapoDik</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {currentData.map((bukti, index) => (
                    <tr key={bukti.id}>
                        <td>{index + 1}</td>
                        <td>{bukti.id}</td>
                        <td>{bukti.dataSiswaId}</td>
                        <td><img className="bukti-gambar" src={`${IMAGE_URL}/${bukti.ijazah_sk}`} alt="ijazah_sk cuy" /></td>
                        <td><img className="bukti-gambar"src={`${IMAGE_URL}/${bukti.kartu_keluarga}`} alt="kartu_keluarga" /></td>
                        <td><img className="bukti-gambar"src={`${IMAGE_URL}/${bukti.akta_kelahiran}`} alt="akta_kelahiran" /></td>
                        <td><img className="bukti-gambar"src={`${IMAGE_URL}/${bukti.SS_lulus_dapodik}`} alt="SS_lulus_dapodik" /></td>
                        <td>
                        <Link
                            to={`/bukti/editbukti/${bukti.dataSiswaId}`}
                            className="btnEdit"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => hapusBukti(bukti.dataSiswaId)}
                            className="btnHapus"
                        >
                            Hapus
                        </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <div class="pagination">
            <button onClick={() => handleClick("prev")} class="page-button">Prev</button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={currentPage === index + 1 ? "page-button-active" : "page-button-nonactive"}
                >
                {index + 1}
                </button>
            ))}
            <button onClick={() => handleClick("next")} class="page-button">Next</button>
            </div>
            <p className="jumlah-data">Jumlah Data : {jmlData}</p>
            <p className="jumlah-data">Jumlah Page : {totalPages}</p>
        </div>
    </div>
);
};

export default ListBukti;
