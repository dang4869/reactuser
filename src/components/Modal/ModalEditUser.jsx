import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEditUser(props) {
  const showEdit = props.showEdit;
  const handleCloseEdit = props.handleCloseEdit;
  const dataUserEdit = props.dataUserEdit;
  const handleEidtUserModal = props.handleEidtUserModal;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleUpdateUser = async () => {
    let res = await updateUser(name, job, dataUserEdit.id);
    if (res && res.updatedAt) {
      handleEidtUserModal({
        first_name : name,
        id: dataUserEdit.id
      })
      toast.success("Update thành công");
      handleCloseEdit()
    }
    console.log(res);
  };
  useEffect(() => {
    if (showEdit) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);
  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="email"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="Job" className="form-label">
            Job
          </label>
          <input
            type="text"
            className="form-control"
            id="Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEdit}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateUser}>
          Comfirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditUser;
