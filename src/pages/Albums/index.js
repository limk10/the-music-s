import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InformationCard from "~/components/InformationCard";
import ArtistFilter from "~/components/Filter";

import api from "~/services/api";
import { LAST_FM_KEY } from "~/config/api";

import actionsLoading from "~/actions/loading";
import actionsAlbums from "~/actions/albums";

import InfiniteScroll from "react-infinite-scroll-component";

function Albums() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({});
  const [hasMore, setHasMore] = useState(true);

  const albums = useSelector((state) => state.reducerAlbums.addAlbums);
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
        `?method=album.search&album=${form?.name}&page=${_page ||
          page}&limit=10&api_key=${LAST_FM_KEY}&format=json`
      );
      const { albummatches } = data?.results;

      if (!albummatches?.album) setHasMore(false);

      if (_page) {
        dispatch(actionsAlbums.addAlbums(albummatches.album));
      } else {
        const oldCollection = albums || [];
        let newCollection = [...oldCollection, ...albummatches.album];
        dispatch(actionsAlbums.addAlbums(newCollection));
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
        <div className="col-xs-12 col-sm-3">
          <ArtistFilter
            handleSearch={handleSearch}
            handleChange={handleChange}
            form={form}
          />
        </div>
        <div className="col-xs-12 col-sm-9">
          {albums && !albums?.length && (
            <h6 className="title u-center">Nenhum(a) álbum encontrado :(</h6>
          )}
          {!albums && (
            <h6 className="u-center">
              Sem album por enquanto, clique em &quot;Abrir Filtro&quot; e faça
              a busca que desejar
            </h6>
          )}
          <InfiniteScroll
            dataLength={(albums && Object.keys(albums).length) || []}
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
              {albums?.map((item, key) => (
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

export default Albums;
