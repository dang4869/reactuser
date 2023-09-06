import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";
function ModalComfirm(props) {
  const { showComfirm, handleCloseComfirm, dataUserDelete, handleDeleteUserModal } = props;
  const comfirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if(res && +res.statusCode === 204){
       toast.success('Thành công')
       handleCloseComfirm()
       handleDeleteUserModal(dataUserDelete)
    }else{
      toast.error('Thất bại')
    }
    console.log(res);
  };
  return (
    <Modal show={showComfirm} onHide={handleCloseComfirm}>
      <Modal.Body>
        Bạn có muốn xóa <b>email: {dataUserDelete.email}</b> không ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseComfirm}>
          Không
        </Button>
        <Button variant="primary" onClick={comfirmDelete}>
          Có
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComfirm;
