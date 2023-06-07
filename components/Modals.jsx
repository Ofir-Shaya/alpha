import { Modal } from "@nextui-org/react";
import * as React from "react";
import { toast } from "react-toastify";

export const SuccessModal = ({ message }) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
export const ErrModal = ({ message }) => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <Modal noPadding onClose={closeHandler} open={visible}>
      <Modal.Header>
        <Text h2>Error Message:</Text>
      </Modal.Header>
      <Modal.Body>
        <Text h4>{message}</Text>
      </Modal.Body>
    </Modal>
  );
};
