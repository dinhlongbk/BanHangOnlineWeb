import React, { useEffect, useState } from "react";
import { getDetailCus } from "../../../services/AdminService";
const CustomerProfile = props => {
  const name = props.match.params.name;
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    getDetailCus(name).then(res => {
      if (res.error !== true && res.data.code === 0) {
        console.log(res.data.result);
        setCustomer(res.data.result);
      }
    });
  }, []);
  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                alt
              />
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{customer.name}</h5>
              <h6>{customer.address}</h6>
              <p className="proile-rating">
                BirthDay : <span>{customer.birthday}</span>
              </p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <input
              type="submit"
              className="profile-edit-btn"
              name="btnAddMore"
              defaultValue="Edit Profile"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>{customer.id}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label> Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{customer.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Address</label>
                  </div>
                  <div className="col-md-6">
                    <p>{customer.address}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{customer.phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>BirthDay</label>
                  </div>
                  <div className="col-md-6">
                    <p>{customer.birthday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerProfile;