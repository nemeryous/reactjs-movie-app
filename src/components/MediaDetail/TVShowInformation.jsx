import React from "react";

const TVShowInformation = ({ mediaInfo = {} }) => {
  console.log({ mediaInfo });
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Information</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{mediaInfo.original_name}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        {(mediaInfo.origin_country || []).map((countryCode) => (
          <img
            key={countryCode}
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
            className="w-[1.4vw] mt-1 mr-1"
          />
        ))}
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{mediaInfo.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Network</p>

        {(mediaInfo.networks || []).map((network) => (
          <img
            key={network.id}
            src={`https://media.themoviedb.org/t/p/h30${network.logo_path}`}
            alt=""
            className="invert"
          />
        ))}
      </div>
    </div>
  );
};

export default TVShowInformation;
