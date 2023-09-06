import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";
function ModalAddNew(props) {
  const show = props.show;
  const handleClose = props.handleClose;
  const handleUpdateTable = props.handleUpdateTable;
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const handleSave = async()=>{
    let res = await postCreateUser(name, job)
    console.log(res);
    if(res && res.id){
      handleClose()
      setJob('')
      setName(' ')
      toast.success('Thêm mới thành công')
      handleUpdateTable({first_name: name, id: res.id})
    }else{
      toast.error('Thêm mới thất bại')
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
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
              onChange={(e) =>setName(e.target.value)}
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
              onChange={(e) =>setJob(e.target.value)}
            />
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNew;
