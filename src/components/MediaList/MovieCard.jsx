import React from "react";
import CircularProgressBar from "../CircularProgressBar";
import { Link } from "react-router-dom";

const MovieCard = ({ id, title, releaseDay, poster, point, mediaType }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="border border-slate-800 rounded-lg relative">
        {mediaType === "tv" && (
          <p className="absolute right-0  bg-black text-white p-1 text-sm rounded shadow-md font-bold">
            TV Show
          </p>
        )}
        <img
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt=""
        />
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
