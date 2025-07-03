import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TOKEN from "../api/api_token";
import Loading from "../components/Loading";
import Banner from "../components/MediaDetail/Banner";
import ActorList from "../components/MediaDetail/ActorList";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // console.log(id);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        setMovieInfo(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className="bg-black text-white text-[1.2vw]">
        <div className="flex mx-auto max-w-7xl px-6 py-10 gap-6">
          <div className="flex-2/3">
            <ActorList actors={movieInfo.credits?.cast} />
          </div>
          <div className="flex-1/3">
            <p>Information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
