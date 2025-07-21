import ImageComponent from "@components/Image";
import React from "react";

const ActorInfo = ({ id, name, character, profilePath }) => {
  return (
    <div className="border border-slate-300 shadow-sm rounded-lg bg-black">
      {/* <img
        className="rounded-lg"
        src={
          profilePath
            ? `https://image.tmdb.org/t/p/w276_and_h350_face${profilePath}`
            : "/276x350.svg"
        }
        alt=""
        width={276}
        height={350}
      /> */}
      <ImageComponent
        className="rounded-lg"
        src={
          profilePath
            ? `https://image.tmdb.org/t/p/w276_and_h350_face${profilePath}`
            : "/276x350.svg"
        }
        width={276}
        height={350}
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {/* <p>18 episode</p> */}
      </div>
    </div>
  );
};

export default ActorInfo;
