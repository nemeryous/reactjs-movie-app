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
  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   fetch("https://api.themoviedb.org/3/movie/popular", {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization: `Bearer ${TOKEN}`,
  //     },
  //   })
  //     .then(async (res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       const popularMovies = data.results.slice(0, 4);
  //       setActiveMovieId(popularMovies[0]?.id);
  //       setMovies(popularMovies);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

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
