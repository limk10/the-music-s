import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";

function Perfil() {
  const user = useSelector((state) => state.reducerUser.userInfo);
  const globalLoading = useSelector(
    (state) => state.reducerLoading.handleLoading
  );

  return (
    <div className="content u-center row">
      {globalLoading && (
        <div className="col-12 u-flex u-items-center u-justify-center">
          <div className="animated loading hide-text">
            <p>Hidden</p>
          </div>
        </div>
      )}
      {!globalLoading && user && (
        <>
          <div className="col-12 animated fadeIn">
            <div className="tile__icon">
              <figure className="avatar avatar--xlarge">
                <img src={user?.avatar} />
              </figure>
            </div>
          </div>
          <div className="col-12 pt-3">
            <div className="row ignore-screen level u-center">
              <input
                disabled
                className="width-50"
                type="name"
                value={user?.first_name}
              />
            </div>
            <div className="row ignore-screen level u-center">
              <input
                disabled
                className="width-50"
                type="name"
                value={user?.last_name}
              />
            </div>
            <div className="row ignore-screen level u-center">
              <input
                disabled
                className="width-50"
                type="name"
                value={user?.email}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Perfil;
