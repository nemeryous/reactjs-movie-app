/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MediaInformation from "@components/MediaDetail/MediaInformation";
import useFetch from "@hooks/useFetch";

const MovieDetails = () => {
  const { id } = useParams();

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  const { data: recommendationsResponse, isLoading: isRelatedMediaLoading } =
    useFetch({
      url: `/movie/${id}/recommendations`,
    });

  const relatedMedia = recommendationsResponse.results || [];
  const certificationList = movieInfo?.release_dates?.results || [];
  const certification = (
    certificationList.find((result) => result.iso_3166_1 === "US") ||
    certificationList[0]
  )?.release_dates.find(
    (releaseDate) => releaseDate.certification
  )?.certification;
  const crews = (movieInfo?.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Banner
        title={movieInfo.title}
        backdropPath={movieInfo.backdrop_path}
        posterPath={movieInfo.poster_path}
        certification={certification}
        crews={crews}
        genres={movieInfo.genres}
        releaseDate={movieInfo.release_date}
        point={movieInfo.vote_average}
        overview={movieInfo.overview}
      />
      <div className="bg-black text-white text-[1.2vw]">
        <div className="flex mx-auto max-w-7xl px-6 py-10 gap-6 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast} />
            <RelatedMediaList
              mediaList={relatedMedia}
              isLoading={isRelatedMediaLoading}
            />
          </div>
          <div className="flex-1">
            <MediaInformation mediaInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
