import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

/**
 * @class
 * @constructor
 */
class RejectDeliveryModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true,
      rejectionReason: ""
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

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description renders modal view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          overlayClassName = "reject-modal"
          className="reject-delivery-modal"
          contentLabel="Example Modal"
        >
          <div className="reject-delivery-modal-content">
            <button
              className="close-btn"
              onClick={this.props.toggleRejectDeliveryModal}
            >
              <i
                className="fa fa-times-circle"
                size="2x"
              />
            </button>
            <h2>Reason For Rejection</h2>
            <form
              onSubmit={event => this.props.handleFormSubmit(event, this.props.id, this.state.rejectionReason)}
            >
              <div className="reject-delivery-input">
                <textarea
                  className="delivery-rejection-reason form-control"
                  name="rejectionReason"
                  onChange={this.handleChange}
                  value={this.state.rejectionReason}
                  required
                />
              </div>
              <div className="reject-modal-ctrl-btn">
                <button className="btn btn-danger btn-cancel">Reject Delivery</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

RejectDeliveryModal.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  toggleRejectDeliveryModal: PropTypes.func.isRequired
};

export default RejectDeliveryModal;
