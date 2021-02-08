import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./styles.css";

function Filter(props) {
  const { handleSearch, handleChange, form } = props;
  const [showFilter, setShowFilter] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const globalLoading = useSelector(
    (state) => state.reducerLoading.handleLoading
  );

  const search = (e) => {
    e?.preventDefault();
    if (!Object.keys(form).length) return;
    setShowHistory(false);
    setSearchHistory(form?.name);
    handleSearch(1);
  };

  const searchByHistory = (name, e) => {
    handleChange("name", name);
    search(e);
  };

  const getSearchHistory = () => {
    const searchHistory = localStorage.getItem("search-history");
    return JSON.parse(searchHistory);
  };

  const removeSearchHistory = () => {
    localStorage.removeItem("search-history");
  };

  const setSearchHistory = async (data) => {
    const searchHistory = getSearchHistory();
    let collection = searchHistory || [];
    if (collection.includes(data)) return;
    collection.push(data);
    localStorage.setItem("search-history", JSON.stringify(collection));
  };

  return (
    <>
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="outline btn-primary full-width"
      >
        {showFilter ? "Fechar Filtro" : "Abrir Filtro"}
      </button>
      {showFilter && (
        <form onSubmit={(e) => search(e, 1)}>
          <div className="animated fadeIn">
            <div className="row">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="outline btn-primary full-width"
                type="reset"
              >
                {showHistory ? "Fechar Histórico" : "Histórico de Pesquisa"}
              </button>
              {showHistory && (
                <div className="animated fadeIn">
                  <a
                    href="#!"
                    className="text-primary"
                    onClick={(e) => removeSearchHistory()}
                  >
                    Remover Histórico
                  </a>
                  <ul className="list-history pr-10 pl-3">
                    {getSearchHistory() &&
                      getSearchHistory().map((item, key) => (
                        <li key={key}>
                          {item} -{" "}
                          <a
                            href="#!"
                            className="text-primary"
                            onClick={(e) => searchByHistory(item, e)}
                          >
                            Buscar
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              <div className="col-12 px-0">
                <input
                  type="name"
                  placeholder="Informe o Artista ou Álbum"
                  value={form?.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
            </div>
            <button
              disabled={globalLoading}
              type="submit"
              className="btn-primary full-width"
            >
              <div
                className={
                  globalLoading ? "animated loading loading-white white" : ""
                }
              >
                Buscar :)
              </div>
            </button>
          </div>
        </form>
      )}
    </>
  );
}

Filter.propTypes = {
  handleSearch: PropTypes.any,
  handleChange: PropTypes.any,
  form: PropTypes.any,
};

export default Filter;
