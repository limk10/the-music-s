import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InformationCard from "~/components/InformationCard";
import ArtistFilter from "~/components/Filter";

import api from "~/services/api";
import { LAST_FM_KEY } from "~/config/api";

import actionsLoading from "~/actions/loading";
import actionsArtists from "~/actions/artists";

import InfiniteScroll from "react-infinite-scroll-component";

function Artists() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({});
  const [hasMore, setHasMore] = useState(true);

  const artists = useSelector((state) => state.reducerArtists.addArtists);
  const globalLoading = useSelector(
    (state) => state.reducerLoading.handleLoading
  );

  useEffect(() => {
    return () => {
      setForm({});
    };
  }, []);

  const handleChange = (props, value) => {
    form[props] = value;
    setForm({ ...form });
  };

  const handleSearch = async (_page) => {
    try {
      dispatch(actionsLoading.handleLoading(true));
      const { data } = await api.get(
        `?method=artist.search&artist=${form?.name}&page=${_page ||
          page}&limit=10&api_key=${LAST_FM_KEY}&format=json`
      );
      const { artistmatches } = data?.results;

      if (!artistmatches?.artist) setHasMore(false);

      if (_page) {
        dispatch(actionsArtists.addArtists(artistmatches.artist));
      } else {
        const oldCollection = artists || [];
        let newCollection = [...oldCollection, ...artistmatches.artist];
        dispatch(actionsArtists.addArtists(newCollection));
      }

      setPage(page + 1);
    } catch (error) {
    } finally {
      dispatch(actionsLoading.handleLoading(false));
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-lg-3">
          <ArtistFilter
            handleSearch={handleSearch}
            handleChange={handleChange}
            form={form}
          />
        </div>
        <div className="col-xs-12 col-lg-9">
          {artists && !artists?.length && (
            <h6 className="title u-center">Nenhum(a) artista encontrado :(</h6>
          )}
          {!artists && (
            <h6 className="u-center">
              Sem artistas por enquanto, clique em &quot;Abrir Filtro&quot; e
              faça a busca que desejar
            </h6>
          )}
          <InfiniteScroll
            dataLength={(artists && Object.keys(artists).length) || []}
            next={handleSearch}
            hasMore={hasMore}
            loader={
              globalLoading && (
                <div className="animated loading hide-text">
                  <p>Hidden</p>
                </div>
              )
            }
          >
            <div className="row pt-0">
              {artists?.map((item, key) => (
                <div key={key} className="col-3">
                  <InformationCard item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export default Artists;
