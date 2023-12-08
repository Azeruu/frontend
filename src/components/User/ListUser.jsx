import "./ListUser.css";
// import DashboardMenu from "../Dashboard/DashboardMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL_HOST } from "../../lib/helper";
import axios from "axios";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [jmlData, setJmlData] = useState(0);

  useEffect(()=> {
    getUsers();
  },[]);
  useEffect(() => {
    jumlahData();
  }, []);

  // Batas
  const jumlahData = async () => {
    try {
      const response = await axios.get(`${URL_HOST}/users`);
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = users.slice(startIndex, endIndex);

  // Batas
  const getUsers = async() =>{
    const response = await axios.get(`${URL_HOST}/users`);
    setUsers(response.data);
  }
  const hapusUser = async (uuid) =>{
    try {
      await axios.delete(`${URL_HOST}/users/${uuid}`);
        getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="list-user-container">
      <div className="list-user-grid">
        <h1 className="list-user-judul">Daftar User</h1>
        <div className="list-user-table-container">
        <Link to={`/userlist/adduser`} className="btnadd">
          Tambah User
        </Link>
          <table className="table" id="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID User</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user, index) => (
                <tr key={user.uuid}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={`/userlist/edituser/${user.uuid}`}
                      className="btnEdit"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => hapusUser(user.uuid)}
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
}

export default ListUser