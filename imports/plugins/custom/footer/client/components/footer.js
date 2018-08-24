import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 inner">
              <div className="row">
                <div className="col-sm-2">
                  <ul>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="/faq">FAQ</a></li>
                  </ul>
                </div>
                <div className="col-sm-3">
                  <ul>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Terms and conditions</a></li>
                  </ul>
                </div>
                <div className="col-sm-6 paystack-wrap">
                  <p>Powered by</p>
                  <img className="paystack-logo" src="/images/paystack.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>@ 2018 Gondor-RC</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
