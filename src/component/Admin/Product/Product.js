import React from "react";
import { useState, useEffect } from "react";
import { getListProduct, removeProduct, addProduct, updateProduct } from "../../../services/AdminService";
import { useLocation } from 'react-router-dom';
import ProductItem from "./ProductItem";
import UpdateProduct from "./UpdateProduct";
const Product = () => {
    const [listdata, setData] = useState([{
        id:"",
        name:"",
        description:"",
        price:"",
        inventory:"",
        supplier:{
        },
        category:""
    }]);
    const [updateUser, getUpdateUser] = useState(null);
    let removePd = id => {
        removeProduct(id)
            .then(res => {
                if (res.error !== true && res.data.code === 0) {
                    const resutl = res.data.result;
                    console.log(resutl);
                    setData(resutl);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    const handleAddProduct = (value) => {
        addProduct(value)
            .then(() => {
                getListProduct()
                    .then(res => {
                        setData(res.data.result)
                    })
                    ;
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleUpdateProduct = (id, value) => {
        updateProduct(id, value)
            .then(() => {
                console.log(value);
                getListProduct()
                    .then(res => {
                        console.log(res.data.result);
                        setData(res.data.result)
                    })
                    ;
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getListProduct().then(res => {
            if (res.error !== true) {
                setData(res.data.result);
            }
        });
    }, []);

    return (
        <div>
            <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                    <h1>Danh sách sản phẩm </h1>
                </div>
                <div className="p-2 bd-highlight ml-5 mt-2 pl-5 pr-5">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
                <div className="p-2 bd-highlight ml-5">
                    <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#capnhat"
                        onClick={() => getUpdateUser(null)}
                    >
                        Thêm sản phẩm
          </button>
                </div>
            </div>
            <div>
                <table className="table table-light">
                    <thead>
                        <tr>
                            <td scope="col">Mã Sản Phẩm</td>
                            <td scope="col">Tên</td>
                            <td scope="col">Mô Tả</td>
                            <td scope="col">Giá</td>
                            <td scope="col">Số Lượng</td>
                            <td scope="col">Hình Ảnh</td>
                            <td scope="col">Nhà cung cấp</td>
                            <td scope="col">Loại Hàng</td>
                            <td> Cập Nhật</td>
                        </tr>
                    </thead>
                    {listdata.map((item, i) => {
                        return (
                            <ProductItem
                                key={i}
                                product={item}
                                removePd={removePd}
                                getUpdateUser={getUpdateUser}
                            />
                        );
                    })}
                </table>
            </div>
            {listdata.map((item) => {
                return (
                    <UpdateProduct product={item} updateUser={updateUser} handleAddSubmit={handleAddProduct} handleUpdateProduct={handleUpdateProduct} />
                )
            })}
        </div>
    );
};

export default Product;
