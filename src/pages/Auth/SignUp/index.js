import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import api from "~/services/api";
import { signIn } from "~/services/auth";

import { schemaLogIn } from "~/helpers/formValidation";

import actionsLoading from "~/actions/loading";

import { REQRES_API } from "~/config/api";

function SignUp() {
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

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      dispatch(actionsLoading.handleLoading(true));

      const isValid = await validateForm();
      if (isValid !== undefined) return;

      const data = {
        email: form?.email,
        password: form?.password,
      };

      const { data: result } = await api.post(
        REQRES_API + "api/register",
        data
      );

      toast.info(
        `Registro realizado com sucesso, você será redirecionado para o Home em instantes, aguarde... :)`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        }
      );

      setTimeout(() => {
        dispatch(actionsLoading.handleLoading(false));
        signIn(result?.token);
      }, 5500);
    } catch (error) {
      dispatch(actionsLoading.handleLoading(false));
    }
  };

  return (
    <div className="animated fadeIn">
      <h5 className="title">Registre-se.</h5>
      <p className="subtitle faded">
        Preencha todos os campos obrigatórios para o cadastro
      </p>
      <form onSubmit={(e) => handleRegister(e)} autoComplete="off">
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
            Registrar :)
          </div>
        </button>
      </form>
    </div>
  );
}

export default SignUp;
