import Table from "react-bootstrap/Table";
import _, { debounce } from "lodash";
import { fetchAllUser } from "../services/UserService";
import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import "primeicons/primeicons.css";
import "./TableUser.scss";
import ModalAddNew from "../Modal/ModalAddNewUser";
import ModalEditUser from "../Modal/ModalEditUser";
import ModalComfirm from "../Modal/ModalComfirm";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse'
import { toast } from "react-toastify";

function TableUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showComfirm, setShowComfirm] = useState(false);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [dataExport, setDataExport] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseComfirm = () => setShowComfirm(false);
  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setRows(res.per_page);
    }
    console.log(res);
  };
  const handlePageClick = (event) => {
    console.log(event);
    setFirst(event.first);
    setRows(event.rows);
    getUsers(+event.page + 1);
  };
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setShowEdit(true);
  };
  const handleEidtUserModal = (user) => {
    let clonedUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    clonedUser[index].first_name = user.first_name;
    setListUsers(clonedUser);
  };
  const handleDeleteUser = (user) => {
    console.log(user);
    setShowComfirm(true);
    setDataUserDelete(user);
  };
  const handleDeleteUserModal = (user) => {
    let clonedUser = _.cloneDeep(listUsers);
    clonedUser = clonedUser.filter((item) => item.id !== user.id);
    setListUsers(clonedUser);
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let clonedUser = _.cloneDeep(listUsers);
    clonedUser = _.orderBy(clonedUser, [sortField], [sortBy]);
    setListUsers(clonedUser);
  };
  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let clonedUser = _.cloneDeep(listUsers);
      clonedUser = clonedUser.filter((item) => item.email.includes(term));
      setListUsers(clonedUser);
    } else {
      getUsers(1);
    }
  }, 2000);
  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["id", "Email", "First Name", "Last Name"]);
      listUsers.map((user, index) => {
        let arr = [];
        arr[0] = user.id;
        arr[1] = user.email;
        arr[2] = user.first_name;
        arr[3] = user.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  const handleImportCsv = (event) => {
    if(event.target && event.target.files &&event.target.files[0]){
      let file = event.target.files[0];
      if(file.type !== 'text/csv'){
            toast.error('Only accept CSV files')
            return
      }
        Papa.parse(file, {
      complete: function(results) {
        let rawCsv = results.data
        if(rawCsv.length>0){
           if(rawCsv[0] && rawCsv[0].length ===3){
              if(rawCsv[0][0] !== 'email' || rawCsv[0][1] !== 'first_name' || rawCsv[0][2] !== 'last_name'){
                toast.error('Wrong format Header CSV file!')
              }else{
                let result = []
               rawCsv.map((item,index)=>{
                if(index > 0 && item.length === 3){
                  let obj = {}
                  obj.email = item[0]
                  obj.first_name = item[1]
                  obj.last_name = item[2]
                  result.push(obj)
                }
               })
               setListUsers(result)
              }
           }else{
            toast.error('Wrong format CSV file!')
           }
        }else{
          toast.error('Not found data on CSV file')
        }
        console.log("Finished:", results.data);
      }
    });
    }
    
  
  }
  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>List Users:</span>
        <label className="btn btn-warning" htmlFor="test">
          Import
        </label>
        <input type="file" id="test" hidden onChange={(event) => handleImportCsv(event)}/>
        <CSVLink
          filename={"users.csv"}
          className="btn btn-primary"
          data={dataExport}
          onClick={getUsersExport}
        >
          Export
        </CSVLink>
        ;
        <button className="btn btn-primary" onClick={handleShow}>
          Add new <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Search user by email..."
          onChange={handleSearch}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: 100 }}>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalUsers}
        onPageChange={handlePageClick}
      />
      <ModalAddNew
        show={show}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        showEdit={showEdit}
        handleCloseEdit={handleCloseEdit}
        dataUserEdit={dataUserEdit}
        handleEidtUserModal={handleEidtUserModal}
      />
      <ModalComfirm
        showComfirm={showComfirm}
        handleCloseComfirm={handleCloseComfirm}
        dataUserDelete={dataUserDelete}
        handleDeleteUserModal={handleDeleteUserModal}
      />
    </>
  );
}

export default TableUsers;
