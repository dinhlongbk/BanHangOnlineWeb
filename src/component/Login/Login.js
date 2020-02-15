import React, {useState}from 'react';

import { Link, Redirect, withRouter } from 'react-router-dom';

import { useForm } from "react-hook-form";

import { useCookies } from 'react-cookie';

import Axios from 'axios';

import Swal from 'sweetalert2';
const Login = (props) => {
    const [cookies, setCookies] = useCookies(['authtoken']);
    const { register, handleSubmit, errors } = useForm();
    const url = "http://localhost:8080/api/dangnhap";
    const [resutl, setResutl] = useState();

    const onSubmit = data => {
      Axios.post(url, data, {headers: { 'Content-Type': 'application/json' }})
      .then(async function (response) {
        setCookies('authtoken', response.data.message, { path: '/'});
        if(response.data.code !== 0) {
          setResutl(response.data.message);
        } else {
          const {value: accept} = await Swal.fire({
            title: "Thông báo",
            text: "Đăng nhập thành công",
            icon: "success"
          })
          if(accept) {
            props.history.push('/trangchu');
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }; // your form submit function which will invoke after successful validation
    return (
            <form className="container" onSubmit={handleSubmit(onSubmit)} >
            <div className="row">
            <div className="col-md-5">
              <h1>Đăng nhập</h1>
            </div>
            {
              resutl ? <div className="alert alert-warning" role="alert">{resutl}</div> : ''
            }
          </div>
                <div className="row">
                  <div className="col-md-3">
                    <label>Tài Khoản</label>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                    <input className="form-control" name="taiKhoan" type="text" ref={register({ required: true })}/>
                    </div>
                  </div>
                  <div className="col-md-3">
                  {errors.taiKhoan && <p>Tài khoản không được để trống</p>}
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                    <label>Mật Khẩu</label>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      <input className="form-control" name="matKhau" type="password" ref={register({ required: true })}/>
                      </div>
                    </div>
                    <div className="col-md-3">
                    {errors.pass && <p>Mật khẩu không được để trống</p>}
                    </div>
                  </div>
                <div className="row">
                  <div className="col-md-9">
                    <input className="btn btn-info" type="submit" value="Đăng Nhập"/>
                  </div>
                </div>
                <Link to="/dangky"><p>Bạn chưa có tài khoản ? Nhấn vào đây để đăng ký </p></Link>
            </form>
    );
};

export default withRouter(Login);