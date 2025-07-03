import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import React from "react";
import CircularProgressBar from "../CircularProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = ({ mediaInfo }) => {
  console.log(mediaInfo);
  const certificationList = mediaInfo?.release_dates?.results || [];
  const certification = (
    certificationList.find((result) => result.iso_3166_1 === "US") ||
    certificationList[0]
  )?.release_dates.find(
    (releaseDate) => releaseDate.certification
  )?.certification;
  const crews = (mediaInfo?.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  const groupedCrews = groupBy(crews, "job");
  console.log(groupedCrews);
  return (
    <div>
      <div className="relative text-white">
        <img
          className="absolute inset-0 brightness-[.2]"
          src={`https://image.tmdb.org/t/p/original${mediaInfo.backdrop_path}`}
          alt=""
        />
        <div className="flex relative  max-w-7xl mx-auto px-6 py-10 gap-6">
          <div className="flex-1/3">
            <img
              className="flex-1/3"
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mediaInfo.poster_path}`}
              alt=""
            />
          </div>

          <div className="flex-2/3 text-[1.2vw]">
            <p className="font-bold mb-2 text-[2vw]">{mediaInfo.title}</p>
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 border border-gray-400 p-1">
                {certification}
              </span>
              <p>{mediaInfo.release_date}</p>
              <p>
                {(mediaInfo.genres || []).map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CircularProgressBar
                  percent={mediaInfo.vote_average * 10}
                  size={3.5}
                  strokeWidth={0.3}
                />{" "}
                73 rating
              </div>
              <button>
                <FontAwesomeIcon icon={faPlay} />
                Tra
              </button>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
              <p>{mediaInfo.overview}</p>
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
    </div>
  );
};

export default Banner;
