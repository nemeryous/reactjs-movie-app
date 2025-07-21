import React, { useState } from "react";
import ActorInfo from "./ActorInfo";

const ActorList = ({ actors = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const currentActors = isShowMore ? actors.splice(0, 10) : actors.slice(0, 4);

  return (
    <div>
      <p className="font-bold text-[1.4vw] mb-4">Actors</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {currentActors.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
            episodeCount={actor.episodeCount}
          />
        ))}

        {/* <ActorInfo />
        <ActorInfo />
        <ActorInfo />
        <ActorInfo /> */}
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

export default ActorList;
