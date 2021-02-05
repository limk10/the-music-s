import React, { useState } from "react";

function SignIn() {
  const [form, setForm] = useState({});

  const handleChange = (props, value) => {
    form[props] = value;
    setForm({ ...form });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="animated fadeIn">
      <h5 className="title">Log in.</h5>
      <p className="subtitle faded">
        Entre com os dados inseridos durante o registro
      </p>
      <form onSubmit={(e) => handleLogin(e)} autoComplete="off">
        <div className="input-control">
          <div className="col-9 ignore-screen level-item">
            <input
              type="name"
              placeholder="Email"
              value={form?.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
        <div className="input-control">
          <div className="col-9 ignore-screen level-item">
            <input
              type="password"
              placeholder="Senha"
              value={form?.email}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        </div>

        <button className="btn-primary full-width mt-2" type="submit">
          Entrar :)
        </button>
      </form>
    </div>
  );
}

export default SignIn;
