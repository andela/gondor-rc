import React, { Component } from "react";
import PopModal from "react-modal";

/**
 * @class
 * @constructor
 */
class Modal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };
  }

  componentDidMount() {
    localStorage.setItem("visited", "visited by this user");
  }

  /**
   * @description opens the modal
   * @method openModal
   * @returns {void}
   */
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  /**
   * @description renders modal view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div>
        <PopModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          overlayClassName = "faq-modal"
          className="modalStyle"
          contentLabel="Example Modal"
        >
          <div className="modal-text-content">
            <h2>Welcome To The Gondor <br /> Store</h2>
            <div className="modal-ctrl-btn">
              <a className="btn btn-default" href="/faq"> GO TO FAQ </a>
              <button className="btn btn-default"
                onClick={this.closeModal}
              >SKIP</button>
            </div>
          </div>
        </PopModal>
      </div>
    );
  }
}

export default Modal;
