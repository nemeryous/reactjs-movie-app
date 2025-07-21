import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import useFetch from "@hooks/useFetch";

const FeatureMovie = () => {
  const [activeMovieId, setActiveMovieId] = useState();

  const { data: popularMovieResponse, isLoading: loading } = useFetch({
    url: `/movie/popular`,
  });
  const movies = (popularMovieResponse.results || []).slice(0, 4);
  useEffect(() => {
    if (movies.length > 0) {
      setActiveMovieId(movies[0].id);
    }
  }, [JSON.stringify(movies)]);


  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
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
