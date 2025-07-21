import MovieCard from "@components/MediaList/MovieCard";
import React from "react";

const RelatedMediaList = ({ mediaList = [] }) => {
  return (
    <div>
      <p className="font-bold text-[1.4vw] mb-4">More like this</p>
      <div>
        {/* {mediaList.map((media) => (
          <MovieCard key={media.id} id={media.id} title: {media};
    releaseDay: {};
    poster: {};
    point: {};
    mediaType: {}; />
        ))} */}
      </div>
    </div>
  );
};

export default RelatedMediaList;
