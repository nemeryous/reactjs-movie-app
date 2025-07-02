import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import TOKEN from "../../api/api_token";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const activeTab = tabs.find((tab) => tab.id === activeTabId);
    if (activeTab && activeTab.url) {
      fetch(activeTab.url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          const trendingMediaList = data.results.slice(0, 12);
          setMediaList(trendingMediaList);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [activeTabId, tabs]);

  return (
    <div className="px-8 text-[1.2vw] py-10 bg-black text-white">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex border border-white rounded">
          {/* <li className="bg-white text-black px-2 py-1 rounded cursor-pointer">
            All
          </li>
          <li className=" px-2 py-1 rounded cursor-pointer">Movie</li>
          <li className=" px-2 py-1 rounded cursor-pointer">TV Show</li> */}
          {tabs.map((tab) => {
            return (
              <li
                key={tab.id}
                className={`px-2 py-1 rounded cursor-pointer ${
                  tab.id === activeTabId ? "text-black bg-white" : ""
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.name}
              </li>
            );
          })}
        </ul>
      </div>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {mediaList.map((media) => {
            return (
              <MovieCard
                id={media.id}
                key={media.id}
                title={media.title || media.name}
                releaseDay={media.release_date || media.first_air_date}
                poster={media.poster_path}
                point={media.vote_average}
                mediaType={media.media_type || activeTabId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaList;
