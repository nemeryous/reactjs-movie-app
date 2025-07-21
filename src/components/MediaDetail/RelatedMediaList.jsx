import Loading from "@components/Loading";
import MovieCard from "@components/MediaList/MovieCard";
import React from "react";

const RelatedMediaList = ({ mediaList = [], isLoading }) => {
  return (
    <div>
      <p className="font-bold text-[1.4vw] mb-4">More like this</p>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {mediaList.map((media) => (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media.title}
              releaseDay={media.release_date}
              poster={media.poster_path}
              point={Math.round(media.vote_average)}
              mediaType={media.media_type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedMediaList;
