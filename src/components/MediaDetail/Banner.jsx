import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import React from "react";
import CircularProgressBar from "../CircularProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = ({
  title,
  backdropPath,
  posterPath,
  certification,
  crews,
  genres,
  releaseDate,
  point = 0,
  overview,
}) => {

  const groupedCrews = groupBy(crews, "job");
  // console.log({ groupedCrews, crews });
  return (
    <div className="relative text-white overflow-hidden shadow-sm shadow-skate-800">
      <img
        className="absolute aspect-video w-full inset-0 brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt=""
      />
      <div className="flex relative lg:gap-8 max-w-7xl mx-auto px-6 py-10 gap-6">
        <div className="flex-1">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`}
            alt=""
            width={600}
            height={900}
          />
        </div>

        <div className="flex-[2] text-[1.2vw]">
          <p className="font-bold mb-2 text-[2vw]">{title}</p>
          <div className="flex gap-4 items-center">
            <span className="text-gray-400 border border-gray-400 p-1">
              {certification}
            </span>
            <p>{releaseDate}</p>
            <p>{(genres || []).map((genre) => genre.name).join(", ")}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(point * 10)}
                size={3.5}
                strokeWidth={0.3}
              />{" "}
              73 rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
