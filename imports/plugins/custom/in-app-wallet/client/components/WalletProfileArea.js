import React, { Component } from "react";
import shortid from "shortid";
import once from "lodash/once";
import PaystackButton from "react-paystack";
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
    amount: 0,
    libraryLoaded: false,
    amountInputVisible: false
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

  showAmountInput = () => {
    this.setState({
      amountInputVisible: true
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
            <label>Deposit amount:</label>
            <input
              name="amount"
              className="form-control"
              type="number"
              value={this.state.amount}
              onChange={this.handleAmountChange}
            />
          </div>

        }
        <div className="wallet-btns">
          {
            this.state.amountInputVisible &&
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
          {
            !this.state.amountInputVisible &&
            <button
              className={"btn btn-primary"}
              onClick={this.showAmountInput}
            >
              Fund wallet
            </button>
          }

        </div>
      </div>
    );
  }
}


export default WalletProfileArea;
