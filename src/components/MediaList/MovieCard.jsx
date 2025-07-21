import React from "react";
import CircularProgressBar from "../CircularProgressBar";
import { Link } from "react-router-dom";
import Image from "@components/Image";

const MovieCard = ({ id, title, releaseDay, poster, point, mediaType }) => {
  return (
    <Link
      to={mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`}
      className="border border-slate-800 rounded-lg relative"
    >
      <div className="  ">
        {mediaType === "tv" && (
          <p className="absolute right-0  bg-black text-white p-1 text-sm rounded shadow-md font-bold">
            TV Show
          </p>
        )}
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          width={210}
          height={300}
          className={`rounded-lg w-full`}
        />
        {/* <img
          className="rounded-lg w-full"
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt=""
          width={210}
          height={300}
        /> */}
        <div className="px-4 relative -top-[30px]">
          <CircularProgressBar
            percent={Math.round(point * 10)}
            strokeColor={point >= 7 ? "green" : point >= 5 ? "orange" : "red"}
          />
          <p className="font-bold mt-2">{title}</p>
          <div className="text-slate-300">{releaseDay}</div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
