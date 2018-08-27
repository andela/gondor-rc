import React, { Component } from "react";
import PropTypes from "prop-types";
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
            <h1>Cancel Order</h1>
            <h2>Are you sure ?</h2>
            <div className="modal-ctrl-btn">
              <button className="btn btn-danger btn-cancel"
                onClick={e => this.props.cancelOrder(e, this.props.id)}
              >Yes, I am</button>
              <button className="btn btn-success btn-cancel"
                onClick={this.props.toggleCancelModal}
              >No, I'm not</button>
            </div>
          </div>
        </PopModal>
      </div>
    );
  }
}

Modal.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  toggleCancelModal: PropTypes.func.isRequired
};

export default Modal;
