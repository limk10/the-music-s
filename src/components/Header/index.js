import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { logout } from "~/services/auth";

import nav from "~/config/nav";

function Header() {
  const history = useHistory();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state.reducerUser.userInfo);
  const globalLoading = useSelector(
    (state) => state.reducerLoading.handleLoading
  );

  return (
    <div className="header unselectable header-animated">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <a>
            <h6 className="title text-primary">_The Music S</h6>
          </a>
        </div>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className={showMenu ? "nav-item nav-btn active" : "nav-item nav-btn"}
          id="header-btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={showMenu ? "header-nav active" : "header-nav"}
        id="header-menu"
      >
        <div className="nav-left">
          {nav.map((item, key) => (
            <div
              key={key}
              className={
                location?.pathname?.includes(item?.route)
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <a href="#!" onClick={() => history.push(item?.route)}>
                {item.name}
              </a>
            </div>
          ))}
        </div>

        <div className="nav-right">
          <div className="nav-item has-sub toggle-hover" id="dropdown">
            {globalLoading && (
              <div className="col-12 u-flex u-items-center u-justify-center">
                <div className="animated loading hide-text">
                  <p>Hidden</p>
                </div>
              </div>
            )}
            {!globalLoading && (
              <a className="nav-dropdown-link animated fadeIn">
                Olá, {user?.first_name}!
              </a>
            )}
            <ul className="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item">
                <a href="#!" onClick={() => history.push("/perfil")}>
                  Meu Perfil
                </a>
              </li>
              <li role="menu-item">
                <a href="#!" onClick={() => logout()}>
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
