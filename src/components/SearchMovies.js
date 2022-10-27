import { useEffect, useRef, useState } from "react";

import noPoster from "../assets/images/no-poster.png";

function SearchMovies() {
  // Credenciales de API, aca debemos ingresar la que nos llega al email
  const apiKey = "9d2ce046";

  const keywordInput = useRef();

  // keyword será la palabra por la que queremos buscar la / las películas
  const [keyword, setKeyword] = useState("action");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`
      );
      const moviesResponse = await response.json();
      setMovies(moviesResponse.Search);
    };
    if (keyword) {
      getMovies();
    }
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (keywordInput.current.value) {
      setKeyword(keywordInput.current.value);
    }
    keywordInput.current.value = "";
  };

  return (
    <div className="container-fluid">
      {/* Si hay una api key se mostrará el siguiente contenido */}
      {apiKey !== "" ? (
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador de Productos */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="">Buscar:</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={keywordInput}
                  />
                </div>
                <button className="btn btn-info">Search</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Películas para la palabra: {keyword}</h2>
            </div>
            {/* Listado de Películas */}
            {/* Si hay películas mostrar el listado */}
            {movies.length > 0 ? (
              movies.map((movie, i) => {
                return (
                  <div className="col-sm-6 col-md-3 my-4" key={i}>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h5 className="text-center m-0 font-weight-bold text-gray-800">
                          {movie.Title}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            // Si existe movie.Poster y si es distinto "N/A", mostramos movie.Poster y si no mostramos la imagen local noPoster importada de los assets
                            src={
                              movie.Poster && movie.Poster !== "N/A"
                                ? movie.Poster
                                : noPoster
                            }
                            alt={movie.Title}
                            style={{
                              width: "90%",
                              height: "400px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <p className="text-center">{movie.Year}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Si no hay películas deberemos mostrar el siguiente mensaje
              <div className="alert alert-warning text-center">
                No se encontraron películas
              </div>
            )}
          </div>
        </>
      ) : (
        // Si no hay una api key se mostrará este mensaje
        <div className="alert alert-danger text-center my-4 fs-2">
          Eyyyy... ¿PUSISTE TU APIKEY?
        </div>
      )}
    </div>
  );
}

export default SearchMovies;
