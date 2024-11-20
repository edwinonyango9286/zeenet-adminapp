import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, perfomAction, title } = props;
  return (
    <Modal
      width={420}
      title="Confirm"
      open={open}
      onOk={perfomAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
