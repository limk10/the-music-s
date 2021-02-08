import React from "react";
import PropTypes from "prop-types";

function InformationCard(props) {
  const { item } = props;

  return (
    <div className="card animated fadeIn">
      <div className="card__container">
        <div
          className="card__image"
          style={{
            backgroundImage: `url(${item?.image[4]?.["#text"] ||
              item?.image[3]?.["#text"] ||
              item?.image[2]?.["#text"] ||
              item?.image[1]?.["#text"]})`,
          }}
        ></div>
        <div className="card__title-container">
          <p className="title">{item?.name || ""}</p>
          <span className="subtitle">Ouvintes: {item?.listeners || ""}</span>
        </div>
      </div>
      <div className="content">
        <p>
          Para mais informações clique em &quot;Detalhes&quot;, você será
          redirecionado a página oficial da API
        </p>
      </div>
      <div className="card__action-bar u-center">
        <button
          onClick={() => window.open(item?.url, "_blank")}
          className="btn-primary outline"
        >
          Mais Detalhes
        </button>
      </div>
    </div>
  );
}

InformationCard.propTypes = {
  item: PropTypes.any,
};

export default InformationCard;
