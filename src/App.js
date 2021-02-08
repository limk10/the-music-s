import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "~/routes";

import { isAuthenticated } from "~/services/auth";

import actionsLoading from "~/actions/loading";
import actionsUser from "~/actions/user";
import { REQRES_API } from "~/config/api";
import api from "~/services/api";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      dispatch(actionsLoading.handleLoading(true));
      const { data } = await api.get(REQRES_API + "api/users/4");
      const { data: result } = data;
      dispatch(actionsUser.addUser(result));
    } catch (error) {
    } finally {
      dispatch(actionsLoading.handleLoading(false));
    }
  };

  if (!isAuthenticated())
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <div className="grid grid-gap-2">
        <div className="grid-c-12">
          <Header />
        </div>
        <div className="grid-c-12 px-4">
          <Routes />
        </div>
      </div>
      {/* <div className="grid-c-12">
        <Footer />
      </div> */}
    </BrowserRouter>
  );
};

export default App;
