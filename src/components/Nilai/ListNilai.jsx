import "./ListNilai.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL_HOST } from "../../lib/helper";
import axios from "axios";

const ListNilai = () => {
    const [nilai, setNilai] = useState([]);
    const [jmlData, setJmlData] = useState(0);

    // Batas
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(nilai.length / itemsPerPage);

    const handleClick = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        } else if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentData = nilai.slice(startIndex, endIndex);
    // Batas

    useEffect(() => {
        getNilai();
    }, []);
    useEffect(() => {
        jumlahData();
    }, []);

    const getNilai = async () => {
        const response = await axios.get(`${URL_HOST}/data_nilai`);
        setNilai(response.data);
    };
    // const hapusNilai = async (id) => {
    //     try {
    //     await axios.delete(`${URL_HOST}/hasil/${id}`);
    //     await axios.delete(`${URL_HOST}/rekap_nilai/${id}`);
    //     await axios.delete(`${URL_HOST}/data_nilai/${id}`);
    //     await axios.delete(`${URL_HOST}/data_nilai/${id}`);
    //     getNilai();
    //     } catch (error) {
    //     console.log(error);
    //     }
    // };
    const jumlahData = async () => {
        try {
        const response = await axios.get(`${URL_HOST}/data_nilai`);
        setJmlData(response.data.length);
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <div className="list-nilai-container">
        <div className="list-nilai-grid">
            <h1 className="list-nilai-judul">Daftar Nilai</h1>
            <p className="list-nilai-subjudul">Daftar Nilai yang telah di input oleh Pendaftar</p>
            <div className="list-nilai-table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>Action</th>
                    <th>No</th>
                    <th>ID Nilai</th>
                    <th>ID Siswa</th>
                    <th>PKN 1</th>
                    <th>PKN 2</th>
                    <th>PKN 3</th>
                    <th>PKN 4</th>
                    <th>PKN 5</th>
                    <th>B.Indo 1</th>
                    <th>B.Indo 2</th>
                    <th>B.Indo 3</th>
                    <th>B.Indo 4</th>
                    <th>B.Indo 5</th>
                    <th>MTK 1</th>
                    <th>MTK 2</th>
                    <th>MTK 3</th>
                    <th>MTK 4</th>
                    <th>MTK 5</th>
                    <th>IPS 1</th>
                    <th>IPS 2</th>
                    <th>IPS 3</th>
                    <th>IPS 4</th>
                    <th>IPS 5</th>
                    <th>IPA 1</th>
                    <th>IPA 2</th>
                    <th>IPA 3</th>
                    <th>IPA 4</th>
                    <th>IPA 5</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((nil, index) => (
                    <tr key={nil.id}>
                    <td>
                        <Link
                        to={`/nilailist/editnilai/${nil.dataSiswaId}`}
                        className="btnEdit"
                        >
                        Edit
                        </Link>
                    </td>
                    <td>{index + 1}</td>
                    <td>{nil.id}</td>
                    <td>{nil.dataSiswaId}</td>
                    <td>{nil.pkn1}</td>
                    <td>{nil.pkn2}</td>
                    <td>{nil.pkn3}</td>
                    <td>{nil.pkn4}</td>
                    <td>{nil.pkn5}</td>
                    <td>{nil.bindo1}</td>
                    <td>{nil.bindo2}</td>
                    <td>{nil.bindo3}</td>
                    <td>{nil.bindo4}</td>
                    <td>{nil.bindo5}</td>
                    <td>{nil.mtk1}</td>
                    <td>{nil.mtk2}</td>
                    <td>{nil.mtk3}</td>
                    <td>{nil.mtk4}</td>
                    <td>{nil.mtk5}</td>
                    <td>{nil.ips1}</td>
                    <td>{nil.ips2}</td>
                    <td>{nil.ips3}</td>
                    <td>{nil.ips4}</td>
                    <td>{nil.ips5}</td>
                    <td>{nil.ipa1}</td>
                    <td>{nil.ipa2}</td>
                    <td>{nil.ipa3}</td>
                    <td>{nil.ipa4}</td>
                    <td>{nil.ipa5}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <div class="pagination">
            <button onClick={() => handleClick("prev")} class="page-button">
                Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={
                    currentPage === index + 1
                    ? "page-button-active"
                    : "page-button-nonactive"
                }
                >
                {index + 1}
                </button>
            ))}
            <button onClick={() => handleClick("next")} class="page-button">
                Next
            </button>
            </div>
            <p className="jumlah-data">Jumlah Data : {jmlData}</p>
            <p className="jumlah-data">Jumlah Page : {totalPages}</p>
        </div>
        </div>
    );
};

export default ListNilai;
