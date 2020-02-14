import React, { useState, useEffect } from 'react';

import { useLocation, Link } from 'react-router-dom';

import Axios from 'axios';

import ProductCard from './ProductCard';
import dataTest from './datatest.json'
const ProductSection = () => {
    const [data, setData] = useState({products: []});
    const [pages, setPages] = useState([]);
    let useQuery = () => {
      return new URLSearchParams(useLocation().search);
    }

    const id = useQuery();
    const urlProduct = `http://localhost:8080/api/sanpham/trang?index=${id.get("index")}`;
    const [currentPage, setCurrentPage] = useState(0);
    let getListProduct = async (source) => {
      await Axios.get(urlProduct, {
        cancelToken: source.token
      })
      .then(async res => {
        const products = await res.data.content;
        const total = await res.data.totalPages;
        await setData({products});
        genPage(total);
      }).catch(err => {
        if(Axios.isCancel(err)) {
          console.log(`Canceled`, err);
        } else {
          console.log('err', err)
        }
      })
    }
    let genPage = (total) => {
      let array = [];
      for (let index = 0; index < total; index++) {
        array.push(index);
      }
      setPages(array);
    }
    let handleMoveLeft = () => {
      return (currentPage - 1) < 0 ? currentPage : (currentPage - 1);
    }
    let handleMoveRight = () => {
      return (currentPage + 1) > (pages.length - 1) ? currentPage : (currentPage + 1);
    }
    useEffect(() => {
      const source = Axios.CancelToken.source(); // huỷ request (Rất quan trọng)
      getListProduct(source);
      return () => {
        source.cancel();
      };
    }, [urlProduct])
    return (
        <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="float-md-left mb-4"><h2 className="text-black h5">Tất cả sản phẩm</h2></div>
                  <div className="d-flex">
                    <div className="dropdown mr-1 ml-md-auto">
                      <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Thời gian
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                        <a className="dropdown-item" href="#">Mới nhất</a>
                        <a className="dropdown-item" href="#">Cũ nhất</a>
                      </div>
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuReference" data-toggle="dropdown">Bộ lọc</button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                        <a className="dropdown-item" href="#">Tên, từ A đến Z</a>
                        <a className="dropdown-item" href="#">Tên, từ Z đến A</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">Giá, thấp đến cao</a>
                        <a className="dropdown-item" href="#">Giá, cao đến thấp</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                {data.products.map((item, i) => (
                    <ProductCard key={i} data={dataTest.data} content={item.moTa} name={item.tenSanPham} description={item.moTa} price={item.giaSanPham}/>
                  ))}
              </div>
              <div className="row" data-aos="fade-up">
                <div className="col-md-12 text-center">
                  <div className="site-block-27">
                    <ul>
                      <li><Link to={"sanpham?index=" + (handleMoveLeft())} onClick={() => {setCurrentPage(handleMoveLeft())}}>&lt;</Link></li>
                      {
                        pages.map((item, i) => (
                          <li key={i} className={currentPage === item ? 'active' : ''}><Link to={"sanpham?index=" + item} onClick={() => {setCurrentPage(item)}}>{item}</Link></li>
                        ))
                      }
                      <li><Link to={"sanpham?index=" + (handleMoveRight())}
                      onClick={() => {setCurrentPage(handleMoveRight());
                      }}>&gt;</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 order-1 mb-5 mb-md-0">
              <div className="border p-4 rounded mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">Dịch vụ</h3>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1"><a href="#" className="d-flex"><span>Đang giảm giá</span> <span className="text-black ml-auto">(2,220)</span></a></li>
                  <li className="mb-1"><a href="#" className="d-flex"><span>Mua nhiều</span> <span className="text-black ml-auto">(2,550)</span></a></li>
                  <li className="mb-1"><a href="#" className="d-flex"><span>Yêu thích</span> <span className="text-black ml-auto">(2,124)</span></a></li>
                </ul>
              </div>
              <div className="border p-4 rounded mb-4">
                <div className="mb-4">
                  <h3 className="mb-3 h6 text-uppercase text-black d-block">Lọc bằng giá</h3>
                  <div id="slider-range" className="border-primary" />
                  <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="site-section site-blocks-2">
                <div className="row justify-content-center text-center mb-5">
                  <div className="col-md-7 site-section-heading pt-4">
                    <h2>Hàng vừa xem</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay={100}>
                    <a className="block-2-item" href="#">
                      <figure className="image">
                        <img src="" alt="" className="img-fluid" />
                      </figure>
                      <div className="text">
                        <h3>Bao thư trắng</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={100}>
                    <a className="block-2-item" href="#">
                      <figure className="image">
                        <img src="" alt="" className="img-fluid" />
                      </figure>
                      <div className="text">
                        <h3>Bút bi thiên long</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={200}>
                    <a className="block-2-item" href="#">
                      <figure className="image">
                        <img src="" alt="" className="img-fluid" />
                      </figure>
                      <div className="text">
                        <h3>Bút bi xanh</h3>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductSection;