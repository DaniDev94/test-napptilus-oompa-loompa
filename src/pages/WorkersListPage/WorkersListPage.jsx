//React
import React, { useEffect, useState } from "react";
//Redux
import { connect } from "react-redux";
import { getCharacters } from "../../redux/actions/charactersActions.js";
//Imports
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import FilterInput from "../../components/FilterInput/FilterInput";
import oompaError from "../../assets/images/error/oompa-error.png";
import ReactLoading from "react-loading";
import "./WorkersListPage.scss";

const WorkersListPage = ({ dispatch, page, characters, errors, loading }) => {
  //Hooks
  const [newPage, setNewPage] = useState(page);
  const [search, setSearch] = useState("");

  //Search filters
  const searcher = (e) => {
    setSearch((prev) => (prev = e.target.value));
  };

  let searchResults = [];
  if (!search) {
    searchResults = characters;
  } else {
    searchResults = characters.filter((data) =>
        (data.first_name.toLowerCase() + " " + data.last_name.toLowerCase()).includes(search.toLowerCase()) ||
        data.profession.toLowerCase().includes(search.toLowerCase()) ||
        (data.gender === "F"?  search.toLowerCase().indexOf('woman') === 0 : search.toLowerCase().indexOf('man') === 0)
    );
  }

  useEffect(() => {
    dispatch(getCharacters(newPage));
  }, [dispatch, newPage, page]);

  return (
    <>
      {loading === true ? (
        <div className="d-flex justify-content-center m-custom-loading">
          <ReactLoading type={"balls"} color={"#000000"} height={"7rem"} width={"7rem"} />
        </div>
      ) : (
        <div>
          {errors === true ? (
            <div className="container">
              <div className="b-api-error">
                <p className="b-api-error__txt">Ups! it seems that an error has occurred, our oompa loompa's are working on it to solve it.</p>
                <img onClick={() => window.location.reload()} className="b-api-error__img" src={oompaError} alt="oompa-error"/>
              </div>
            </div>
          ) : (
            <>
              <FilterInput value={search} searchEvent={searcher}></FilterInput>
              <div className="b-main-text" id="scrollableDiv">
                <h2 className="b-main-text__title m-0">Find your Oompa Loompa</h2>
                <p className="b-main-text__subtitle m-0 text-nowrap">There are more than 100K</p>
              </div>
              <div className="d-flex flex-column m-custom-list">
                <CharacterCard characters={searchResults ? searchResults : characters}></CharacterCard>
              </div>
              <div className="b-content-btn">
                {newPage <= 1 ? (
                  <button className="disabled btn btn-dark b-content-btn__btn mt-1" onClick={() => setNewPage((prev) => prev - 1)}>
                    Back
                  </button>
                ) : (
                  <button className="btn btn-dark b-content-btn__btn mt-1" onClick={() => setNewPage((prev) => prev - 1)}>
                    Back
                  </button>
                )}
                {newPage >= 20 ? (
                  <button className="disabled btn btn-dark b-content-btn__btn mt-1" onClick={() => setNewPage((prev) => prev + 1)}>
                    Next
                  </button>
                ) : (
                  <button className="btn btn-dark b-content-btn__btn mt-1" onClick={() => setNewPage((prev) => prev + 1)}>
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { page, characters, errors, loading } = state.characters;
  return {
    page,
    characters,
    errors,
    loading,
  };
};

export default connect(mapStateToProps)(WorkersListPage);
