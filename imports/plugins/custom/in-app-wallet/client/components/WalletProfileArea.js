import React, { Component } from "react";
import shortid from "shortid";
import once from "lodash/once";
import PaystackButton from "react-paystack";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Logger } from "/client/api";
import { formatPriceString } from "/client/api";

/**
 * @class WalletProfileArea
 */
class WalletProfileArea extends Component {
  constructor(props) {
    super(props);
    this.attachPaystackScript();
    this.checkIfPaystackIsLoaded();
  }

  state = {
    key: "pk_test_3dcac092b856b81203007190861ddb7de68fea04",
    email: "foobar@example.com",
    recipientEmail: "",
    amount: 0,
    libraryLoaded: false,
    amountInputVisible: false,
    transferring: false,
    isValidEmail: true
  }

  /**
   * Adds the paystack script to the page
   *
   * @returns {undefined} nothing
   */
  attachPaystackScript = once(() =>  {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "//js.paystack.co/v1/inline.js";
    document.head.appendChild(script);
  })

  /**
   * Checks if the paystack library has been loaded on the page
   *
   * @returns {undefined} nothing
   */
  checkIfPaystackIsLoaded() {
    let i = 0;
    const checkIfLibraryIsLoaded = Meteor.setInterval(() => {
      if (window.PaystackPop) {
        this.setState({ libraryLoaded: true });
        Meteor.clearInterval(checkIfLibraryIsLoaded);
      } else {
        i += 1;
        if (i > 100) {
          Meteor.clearInterval(checkIfLibraryIsLoaded);
          Logger.warn("Error loading Paystack lib from CDN");
        }
      }
    }, 100);
  }

  /**
   * Calls fundWallet function from props with deposit amount
   *
   * @returns {undefined} nothing
   */
  fundWallet = () => {
    this.props.fundWallet(this.state.amount);
  }

  /**
   * Calls transferFunds function from props with deposit amount and email
   *
   * @returns {object} promise
   */
  transferFunds = () => {
    Alerts.alert({
      title: "Are you sure you want to make this transfer",
      type: "warning",
      className: "transfer",
      showCancelButton: "Cancel Transfer"
    }, (isConfirm) => {
      isConfirm && this.props.transferFunds(this.state.recipientEmail, this.state.amount)
        .then((res) => {
          let type;
          if (res.success) {
            type = "success";
          } else {
            type = "error";
          }
          Alerts.toast(res.message, type);
          this.setState({ recipientEmail: "",
            transferring: false,
            amountInputVisible: false  });
        })
        .catch((err) => Alerts.toast(err.message));
    });
  }

  /**
   * Handles paystack modal close
   *
   * @returns {undefined} nothing
   */
  handlePaystackModalClose = () => {
    this.setState({ amount: 0, amountInputVisible: false });
  }


  handleAmountChange = (event) => {
    const amount = parseInt(event.target.value, 10);
    this.setState({
      amount
    });
  }
  handleEmailChange = (event) => {
    const email = event.target.value;
    let isValidEmail = true;
    if (email) {
      isValidEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)$/.test(email);
    }
    this.setState({
      recipientEmail: email,
      isValidEmail
    });
  }

  showAmountInput = () => {
    this.setState({
      amountInputVisible: true
    });
  }
showTransferOptions = () => {
  this.setState({
    transferring: true
  });
}
  hideAmountInput = () => {
    this.setState({
      amount: 0,
      amountInputVisible: false
    });
  }

  render() {
    return (
      <div className="wallet-profile-area">

        <h4 className="wallet-balance">
          Wallet balance: <b>{formatPriceString(this.props.balance)}</b>
        </h4>
        {
          this.state.amountInputVisible &&
          <div>
            <label>
              {this.state.transferring ? "Transfer" : "Deposit"} amount:
            </label>
            <input
              name="amount"
              className="form-control"
              type="number"
              value={this.state.amount}
              onChange={this.handleAmountChange}
            />
          </div>

        }
        {
          this.state.amountInputVisible &&
          this.state.transferring &&
          <div>
            <div>
              <div className="input-field">
                <label>Email Address:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.recipientEmail}
                  onChange={this.handleEmailChange}
                />
              </div>

              { this.state.recipientEmail &&
          !this.state.isValidEmail &&
            <div className="error">
            You have entered an invalid email
            </div >
              }
            </div>
            <div className="btn-layout">

              <button
                className={"btn btn-primary"}
                onClick={this.transferFunds}
                disabled={!this.state.recipientEmail ||
                !this.state.isValidEmail}
              >
                Transfer
              </button>
              <button
                className="btn btn-primary"
                onClick={this.hideAmountInput}
              >
                Cancel
              </button>
            </div>
          </div>
        }
        <div className="wallet-btns">
          {
            this.state.amountInputVisible && !this.state.transferring &&
            <span>
              {
                this.state.libraryLoaded ?
                  <PaystackButton
                    text="Continue with paystack"
                    class="btn btn-primary paystack-wallet-btn"
                    callback={this.fundWallet}
                    close={this.handlePaystackModalClose}
                    reference={shortid.generate()}
                    email={this.state.email}
                    amount={this.state.amount * 100}
                    paystackkey={this.state.key}
                  /> :
                  <span> Connecting to paystack ...</span>
              }
              <button
                className="btn"
                onClick={this.hideAmountInput}
              >
                Cancel
              </button>
            </span>

          }
          <div className="btn-layout">
            {
              !this.state.amountInputVisible &&
            <button
              className={"btn btn-primary"}
              onClick={this.showAmountInput}
            >
              Fund wallet
            </button>
            }
            {
              !this.state.amountInputVisible &&
            (this.props.balance > 0) &&
            <button
              className={"btn btn-primary"}
              onClick={() => {
                this.showAmountInput();
                this.showTransferOptions();
              }}
            >
              Transfer Funds
            </button>
            }
          </div>
        </div>
      </div>
    );
  }
}
WalletProfileArea.propTypes = {
  balance: PropTypes.number,
  fundWallet: PropTypes.func,
  transferFunds: PropTypes.func
};

export default WalletProfileArea;
