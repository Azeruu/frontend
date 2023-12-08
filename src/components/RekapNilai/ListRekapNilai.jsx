import "./ListRekapNilai.css";
import { useState, useEffect } from "react";
import { URL_HOST } from "../../lib/helper";
import axios from "axios";

const ListRekapNilai = () => {
  const [rekapNilai, setRekapNilai] = useState([]);
  const [jmlData, setJmlData] = useState(0);

  useEffect(() => {
    getRekapNilai();
  }, []);
  useEffect(() => {
    jumlahData();
  }, []);

  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(rekapNilai.length / itemsPerPage);

  const handleClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = rekapNilai.slice(startIndex, endIndex);
  
  // Batas
  const getRekapNilai = async () => {
    const response = await axios.get(`${URL_HOST}/rekap_nilai`);
    setRekapNilai(response.data);
  };
  // const hapusrekapNilai = async (id) => {
  //   try {
  //     await axios.delete(`${URL_HOST}/rekap_nilai/${id}`);
  //     getrekapNilai();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const jumlahData = async () => {
    try {
      const response = await axios.get(`${URL_HOST}/rekap_nilai`);
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-rekap-container">
      <div className="list-rekap-grid">
          <h1 className="list-rekap-judul">Rekapitulasi Nilai </h1>
          <p className="list-rekap-subjudul">Rekapitulasi nilai setiap mata pelajaran serta rekapNilai lainnya</p>
        <div className="list-rekap-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID Rekap</th>
                <th>User ID</th>
                <th>Siswa ID</th>
                <th>Nama Siswa</th>
                <th>Rata - Rata Nilai PKN</th>
                <th>Rata - Rata Nilai B.indo</th>
                <th>Rata - Rata Nilai MTK</th>
                <th>Rata - Rata Nilai IPS</th>
                <th>Rata - Rata Nilai IPA</th>
                <th>Jarak Ke sekolah "KM"</th>
                <th>Usia</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((jal, index) => (
                <tr key={jal.id}>
                    <td>{index + 1}</td>
                    <td>{jal.id}</td>
                    <td>{jal.userId}</td>
                    <td>{jal.dataSiswaId}</td>
                    <td>{jal.nama_lengkap}</td>
                    <td>{jal.avrg_nilai_pkn}</td>
                    <td>{jal.avrg_nilai_bindo}</td>
                    <td>{jal.avrg_nilai_mtk}</td>
                    <td>{jal.avrg_nilai_ips}</td>
                    <td>{jal.avrg_nilai_ipa}</td>
                    <td>{jal.jarak}</td>
                    <td>{jal.usia}</td>
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

export default ListRekapNilai;
