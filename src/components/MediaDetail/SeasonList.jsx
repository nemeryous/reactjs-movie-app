import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/Image";
import React, { useState } from "react";

const SeasonList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  console.log({ seasons });
  const currentSeasons = isShowMore
    ? seasons.slice(0, 10)
    : seasons.slice(0, 3);

  return (
    <div className="text-[1.3vw] mt-8">
      <p className="font-bold text-[1.4vw] mb-4">Seasons</p>
      <div className="space-y-4">
        {currentSeasons.map((season) => (
          <div
            key={season.id}
            className="flex gap-4 p-3 rounded-lg shadow-md border border-slate-200"
          >
            <ImageComponent
              className="rounded-lg w-1/4"
              width={130}
              height={195}
              src={`	https://image.tmdb.org/t/p/w300${season.poster_path}`}
            />

            <div className="space-y-1">
              <p className="font-bold text-[1.4vw]">Season 8</p>
              <div className="flex items-center gap-2">
                <p className="font-bold">Rating</p>
                <CircularProgressBar
                  percent={Math.round(season.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                />
              </div>
              <p>
                <span className="font-bold">
                  Release Date: {season.air_date}
                </span>
              </p>
              <p>{season.episode_count} Episodes</p>
              <p>{season.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <p
        className="cursor-pointer mt-1"
        onClick={() => {
          setIsShowMore(!isShowMore);
        }}
      >
        {isShowMore ? `Show Less` : `Show More`}
      </p>
    </div>
  );
};

export default SeasonList;
