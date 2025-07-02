import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Mzk0YjM2MWI0MDI1MzBiMDk1MDJkNTY0YjhjYjRlZiIsIm5iZiI6MTc0NDM0NjIyNi40NDMsInN1YiI6IjY3Zjg5YzcyNmMzNTgzYzk3NTlhM2E3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cmOMu1F8q9DJyOL7KpAFM5PX2YVAdA0DoRmvHA2H3kQ";
const FeatureMovie = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const popularMovies = data.results.slice(0, 4);
        setActiveMovieId(popularMovies[0]?.id);
        setMovies(popularMovies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center py-10">Error: {error}</div>;
  }

  if (movies.length === 0) {
    return <div className="text-white text-center py-10">No movies found</div>;
  }

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => {
          return <Movie data={movie} key={movie.id} />;
        })}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovie;
