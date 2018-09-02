import React, { Component } from "react";
import PropTypes from "prop-types";
import PopModal from "react-modal";

class CancelOrderModal extends Component {
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
          overlayClassName = "cancel-order-modal"
          className="modalStyle"
          contentLabel="Example Modal"
        >
          <div className="modal-text-content">
            <h1>Cancel Order</h1>
            <h2>Are you sure ?</h2>
            <div className="modal-ctrl-btn">
              <button className="btn btn-danger btn-cancel"
                onClick={this.props.cancelOrder}
              >Yes, I am</button>
              <button className="btn btn-success btn-ignore"
                onClick={this.props.toggleCancelModal}
              >No, I&#39;m not</button>
            </div>
          </div>
        </PopModal>
      </div>
    );
  }
}

CancelOrderModal.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  toggleCancelModal: PropTypes.func.isRequired
};

export default CancelOrderModal;
