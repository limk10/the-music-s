import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 4000);
  }, []);

  return (
    <div className="pt-3 content">
      <h5 className="title u-center">Pagina não encontrada :(</h5>
      <h6 className="subtitle u-center">
        Você será redirecionado para pagina principal em alguns segundos!
      </h6>
    </div>
  );
};

export default NotFound;
