import React from 'react';

const AboutReview = () => {
    return (
        <div className="site-section site-section-sm site-blocks-1">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
              <div className="icon mr-4 align-self-start">
                <span className="icon-truck" />
              </div>
              <div className="text">
                <h2 className="text-uppercase">Miễn Phí Vận Chuyển</h2>
                <p>Miễn phí vận chuyển với đơn hàng trên 200000vnd </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
              <div className="icon mr-4 align-self-start">
                <span className="icon-refresh2" />
              </div>
              <div className="text">
                <h2 className="text-uppercase">Miễn Phí Đổi Trả</h2>
                <p>Miễn phí đổi trả với các sản phẩm bị lỗi trong vòng 7 - 14 ngày 
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
              <div className="icon mr-4 align-self-start">
                <span className="icon-help" />
              </div>
              <div className="text">
                <h2 className="text-uppercase">Chăm sóc khách hàng</h2>
                <p>Hỗ trợ khách hàng 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AboutReview;