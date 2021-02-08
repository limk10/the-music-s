import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";

import api from "~/services/api";
import { signIn } from "~/services/auth";
import { schemaLogIn } from "~/helpers/formValidation";

import actionsLoading from "~/actions/loading";

import { REQRES_API } from "~/config/api";

function SignIn() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const globalLoading = useSelector(
    (state) => state.reducerLoading.handleLoading
  );

  const handleChange = (props, value) => {
    form[props] = value;
    setForm({ ...form });
  };

  const validateForm = async () => {
    let errors = {};

    await schemaLogIn
      .validate(form, { abortEarly: false })
      .catch(({ inner }) => {
        inner.map(({ path, message }) => {
          errors[path] = message;
        });
      });

    if (!_.isEmpty(errors)) {
      Object.keys(errors).map((item) => {
        toast.warn(`${errors[item]}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
      });
      return errors;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("->");
    try {
      dispatch(actionsLoading.handleLoading(true));

      const isValid = await validateForm();
      if (isValid !== undefined) return;

      const data = {
        email: form?.email,
        password: form?.password,
      };

      const { data: result } = await api.post(REQRES_API + "api/login", data);

      toast.info(
        `Seja bem-vindo(a) novamente, estavamos esperando por você :)`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        }
      );
      console.log(result);
      setTimeout(() => {
        dispatch(actionsLoading.handleLoading(false));
        signIn(result?.token);
      }, 2000);
    } catch (error) {
      dispatch(actionsLoading.handleLoading(false));
    }
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
              value={form?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
        <div className="input-control">
          <div className="col-9 ignore-screen level-item">
            <input
              type="password"
              placeholder="Senha"
              value={form?.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        </div>

        <button
          disabled={globalLoading}
          className="btn-primary full-width mt-2"
          type="submit"
        >
          <div
            className={
              globalLoading ? "animated loading loading-white white" : ""
            }
          >
            Entrar :)
          </div>
        </button>
      </form>
    </div>
  );
}

export default SignIn;
