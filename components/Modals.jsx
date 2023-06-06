import { Modal } from "@nextui-org/react";
import * as React from "react";

export const SuccessModal = ({ message }) => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <Modal noPadding onClose={closeHandler} open={visible}>
      <Modal.Header>
        <Text h2>Success Message:</Text>
      </Modal.Header>
      <Modal.Body>
        <Text h4>{message}</Text>
      </Modal.Body>
    </Modal>
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
