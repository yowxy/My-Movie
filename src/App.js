import { Children, useEffect, useState } from "react";
import StarRating from "./StarRating.js";
const tempMovieData = [
  {
    imdbID: "tt15398776",
    Title: "Oppenheimer",
    Year: "2013",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1517268",
    Title: "Barbie",
    Year: "2023",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  },
  {
    imdbID: "tt8589698",
    Title: "Teenage Mutant Ninja Turtles: Mutant Mayhem",
    Year: "2023",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt15398776",
    Title: "Oppenheimer",
    Year: "2013",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    runtime: 180,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: "tt1517268",
    Title: "Barbie",
    Year: "2023",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    runtime: 114,
    imdbRating: 7.2,
    userRating: 8,
  },
];

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎫</span>
      <h1>Movie</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function MovieItem({ movie, onSelectMovieid }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovieid(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🎬</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onSelectMovieid }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie, index) => (
        <MovieItem
          key={index}
          movie={movie}
          onSelectMovieid={onSelectMovieid}
        />
      ))}
    </ul>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>🎬</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.trunc(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedItem({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🎬</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function WatchedList({ watched, onDeleteWatched }) {
  // const [watched, setWatched] = useState(tempWatchedData);

  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedItem
          key={index}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
function MovieDetail({ Selectedidd, onCloseMovie, onAddWatched, watched }) {
  const [Movies, setMovies] = useState({});
  const [isloading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.some((movie) => movie.imdbID === Selectedidd);
  const userRatingwatched = watched.find(
    (movie) => movie.imdbID === Selectedidd
  )?.userRating;

  const {
    Title: title,
    Released: released,
    Awards: awards,
    Poster: poster,
    Runtime: runtime,
    Year: year,
    Response: response,
    Genre: genre,
    Director: director,
    Plot: plot,
    Actors: actors,

    imdbRating,
  } = Movies;

  function handleaddWatched() {
    const newWatchedMovie = {
      imdbID: Selectedidd,
      title,
      year,
      poster,
      userRating: Number(userRating),
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  console.log(title, runtime, year, response, awards, poster);
  console.log();

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${APP_KEY}&i=${Selectedidd}&`
      );
      const data = await response.json();
      setMovies(data);

      setLoading(false);
      // console.log(data)
    }

    getMovies();
  }, [Selectedidd]);

  useEffect(() => {
    if (!title) return;
    document.title = `PopMovie | ${title} `;

    return function () {
      document.title = "PopMovie";
      console.log(`clean up ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              ❌
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                <span>💲</span>
                <span> Tanggal rilis {released}</span>
              </p>
              <p>
                <span>🚀🚀🚀</span>
                <span>{runtime} </span>
              </p>

              <p>
                <span>🚀</span>
                <span>{imdbRating}</span>
              </p>
            </div>
          </header>

          <section>
            <p>
              <em>
                <p>{plot}</p>
              </em>
            </p>

            <p> Genre: {genre}</p>
            <p>Director: {director}</p>
            <p>Awards : {awards}</p>
            <p>Actor: {actors}</p>

            <div className="rating">
              {/* validasi icon bintang */}
              {!isWatched ? (
                <>
                  <StarRating
                    max={10}
                    size={24}
                    color={"#fcc419"}
                    onsetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleaddWatched}>
                      +Add to Watched
                    </button>
                  )}
                </>
              ) : (
                <p>
                  you have been watched this movie with a rating of{" "}
                  {userRatingwatched} / 10
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function BoxMovies({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return (
    <div className="loader">
      <div className="loading-bar">
        <div className="bar"></div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>❌</span> {message}
    </div>
  );
}

const APP_KEY = "1064af2";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setEroor] = useState("");
  const [query, setQuery] = useState("Avengers");
  const [SelectedMovieid, setSelectedMovieid] = useState(null);

  function handleSelectmovie(id) {
    // console.log(id)
    setSelectedMovieid((Selectedid) => (Selectedid === id ? null : id));
  }

  function handleAddMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleCloseMovie() {
    setSelectedMovieid(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // const tempquerry = 'hitler';

  // useEffect(() =>{
  //   console.log(1)
  // },[])

  // useEffect(() => {
  //   console.log(2)
  // })

  // console.log(3)

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setloading(true);
        setEroor("");
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${APP_KEY}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Error disini");

        const data = await res.json();
        if (data.response === "False") throw new Error(data.Error);
        // console.log(data);
        // console.log(data.Search);

        setMovies(data.Search);
        setloading(false);
        setEroor("");
      } catch (e) {
        if (e.name === "AborError") return;
        setEroor(e.message);
      } finally {
        setloading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setEroor("");
      return;
    }

    fetchMovie();
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <BoxMovies>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovieid={handleSelectmovie} />
          )}
        </BoxMovies>

        <BoxMovies>
          {SelectedMovieid ? (
            <MovieDetail
              Selectedidd={SelectedMovieid}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </BoxMovies>
      </Main>
    </>
  );
}
