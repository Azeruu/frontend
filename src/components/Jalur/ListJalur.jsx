import "./ListJalur.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL_HOST } from "../../lib/helper";
import axios from "axios";

const ListJalur = () => {
  const [jalur, setJalur] = useState([]);
  const [jmlData, setJmlData] = useState(0);

  useEffect(() => {
    getJalur();
    jumlahData();
  }, []);
  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(jalur.length / itemsPerPage);

  const handleClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = jalur.slice(startIndex, endIndex);
  
  // Batas
  const getJalur = async () => {
    const response = await axios.get(`${URL_HOST}/jalur`);
    setJalur(response.data);
  };
  const hapusJalur = async (uuid) => {
    try {
      await axios.delete(`${URL_HOST}/jalur/${uuid}`);
      getJalur();
    } catch (error) {
      console.log(error);
    }
  };
  const jumlahData = async () => {
    try {
      const response = await axios.get(`${URL_HOST}/jalur`);
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-jalur-container">
      <div className="list-jalur-grid">
          <h1 className="list-jalur-judul">Jalur Pendaftaran</h1>
          <p className="list-rekap-subjudul">Jalur pendaftaran yang dapat dipilih dengan batas kuota-nya masing - masing</p>
        <div className="list-jalur-table-container">
          <Link to={`/jalur/addjalur`} className="btnadd-jalur">
            Tambah Jalur
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID Jalur</th>
                <th>Nama Jalur</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((jal, index) => (
                <tr key={jal.uuid}>
                    <td>{index + 1}</td>
                    <td>{jal.id}</td>
                    <td>{jal.nama_jalur}</td>
                    <td>
                      <Link
                        to={`/jalur/editjalur/${jal.id}`}
                        className="btnEdit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => hapusJalur(jal.id)}
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

export default ListJalur;
