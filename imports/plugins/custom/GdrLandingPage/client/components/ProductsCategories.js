import React from "react";

const ProductsCategories = () => (
  <div className="gdr-container">
    <div className="gdr-col-1">
      <div className="img-col-1">
        <div className="lg-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/footwares" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/sneakers.jpg" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Footwares
            </p>
          </div>
        </div>
      </div>

      <div className="img-col-2">
        <div className="sm-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/phones" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/phones.png" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
               Phones & Tablets
            </p>
          </div>
        </div>
        <div className="sm-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/health" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/makeup.jpeg" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Health & Beauty
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* column two */}

    <div className="gdr-col-2">
      <div className="img-col">
        <div className="sm-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/accessories" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/watch.jpeg" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Accessories
            </p>
          </div>
        </div>
      </div>

      <div className="img-col">
        <div className="sm-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/corporate" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/shoes.jpg" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Corporate
            </p>
          </div>
        </div>
      </div>
      <div className="img-col">
        <div className="sm-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/electronics" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/electronics.jpg" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Electronics
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* column three */}

    <div className="gdr-col-3">
      <div className="img-col-1">
        <div className="sm-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/baby" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/baby.jpeg" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Baby,Kids & Toys
            </p>
          </div>
        </div>
        <div className="sm-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/digitalProducts" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/music.png" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Digital Products
            </p>
          </div>
        </div>

      </div>
      <div className="img-col-2">
        <div className="lg-img-box">
          <div className="gdr-btn">
            <a className="btn btn-default btn-md" href="/tag/fashion" role="button">
                Visit shop
            </a>
          </div>
          <img src="/images/dress.jpeg" className="img-responsive" alt="Responsive" />
          <div className="gdr-cat-title">
            <p>
                Fashion
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductsCategories;

