import React, { Component } from "react";

/**
 * @description frequently asked questions
 * @class
 */
class Faq extends Component {
  render() {
    return (
      <div className="faq-content">
        <h2>faq</h2>
        <div className="faq-divider" />
        <div className="faq-column">
          <dl className="faq-accordion">

            <h2>Ordering</h2>
            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo"
              >How do I order?</button>
            </dt>
            <dd id="demo" className="collapse">
              <p>Find the item(s) you wish to order <br />
                  Click on Add to Cart <br />
                  Continue shopping until you have added all desired items to
                   your cart<br />
                  Go to your cart and follow the steps to make payment<br />
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo1"
              >How do I review my order?</button>
            </dt>
            <dd id="demo1" aria-expanded="false" className="collapse">
              <p>Confirm your shipping and payment details. <br/>
                  Click "Change" if you need to make any edits. <br/>
                  Click "Place Order" to complete the checkout process and
                   submit your order.<br/>
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo2"
              >How do I Ship my order?</button>
            </dt>
            <dd id="demo2" className="collapse">
              <p>Enter your shipping address or select a saved address <br/>
                  Choose the shipping speed for your items based on the
                   arrival dates shown. If no options are available, it&#39;s
                   because your item has only one shipping option
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo3"
              >Special offers</button>
            </dt>
            <dd id="demo3" className="collapse">
              <p>Special Offers. Enjoy a 15%off discount: This special offer
                 combines the comprehensive CEO procedure bundle and OnPolicy
                  software to create, control, and communicate your policies
                   throughout the organization.
              </p>
            </dd>

            <h2>Becoming a seller</h2>
            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo5"
              >How do I become a seller?</button>
            </dt>
            <dd id="demo5" className="collapse">
              <p>To become a seller, you have to click on 'register as a seller'
                 on your signup form.

              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo6"
              >How do I place my goods?</button>
            </dt>
            <dd id="demo6" aria-expanded="false" className="collapse">
              <p>To place your goods, you will have to login to your admin dash
                board <br/>
                click on the plus icon located at the right side of your
                 dashboard <br/>
                fill in the product details and click on publish.
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo7"
              >How do I view my products?</button>
            </dt>
            <dd id="demo7" className="collapse">
              <p> To view your product navigate to your admin dashboard and
                 click on view products.
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo8"
              >Offers for sellers</button>
            </dt>
            <dd id="demo8" className="collapse">
              <p> This special offer combines the comprehensive CEO procedure
                 bundle and OnPolicy software to create, control, and
                  communicate your policies throughout the organization.
              </p>
            </dd>

            <h2>Payment</h2>
            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo9"
              >Payment Options</button>
            </dt>
            <dd id="demo9" className="collapse">
              <p>Cash <br/>
                  Check <br/>
                  Any credit or debit card accepted by the store
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo10"
              >Payment on delivery</button>
            </dt>
            <dd id="demo10" aria-expanded="false" className="collapse">
              <p>Just place your order online, select "Pay On Delivery" as your
                 payment option, and pay for your order when its brought to you.
                  If you don&#39;t need to pay with cash, but just prefer to pay
                   with card rather than online, you can do that as well.
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo11"
              >Money Refund</button>
            </dt>
            <dd id="demo11" className="collapse">
              <p>If return is granted: Our policy lasts 30 days. If 30 days have
                 gone by since your purchase, unfortunately, we can&#39;t offer you
                  a refund or exchange. To be eligible for a return, your item
                   must be unused and in the same condition that you received it.
              </p>
            </dd>

            <dt>
              <button data-toggle="collapse" aria-expanded="false"
                data-target="#demo12"
              >Cancelled payment</button>
            </dt>
            <dd id="demo12" className="collapse">
              <p>Charges made three days in advance (subject to cancellation
                 policy) or on day of arrival in person at check in or before
                  arrival if receiving after hours entry instructions.
                   Cancellation - Cancel reservations at least 3 days before
                    check-in at no charge for reservations made on our site.
              </p>
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default Faq;
