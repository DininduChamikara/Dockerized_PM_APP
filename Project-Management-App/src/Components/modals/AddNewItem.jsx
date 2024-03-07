import React, { useState } from "react";
import Modal from "react-modal";
import "./AddNewItem.css";
import CustomTextField from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import currentProject from "../../assets/currentProject.png";

function AddNewItem({
  modalIsOpen,
  setIsOpen,
  addNewWorker,
  inputType,
  btnText,
  placeholderText,
}) {
  const [value, setValue] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const onValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Modal className="modal" ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>
      <div className="container">
        <div className="horizontal-section">
          <div className="loginform">
            <CustomTextField
              type={inputType}
              placeholder={placeholderText}
              onTextChange={(text) => {
                setValue(text);
              }}
            />
            <CustomButton
              text={btnText}
              onClick={() => {
                addNewWorker(value);
                closeModal();
              }}
            />
          </div>
        </div>
        <div className="horizontal-section">
          <img className="background-img" src={currentProject} alt="Login" />
        </div>
      </div>
    </Modal>
  );
}

export default AddNewItem;
