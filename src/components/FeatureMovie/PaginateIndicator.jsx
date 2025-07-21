

const PaginateIndicator = (props) => {
  // const [activeIndex, setActiveIndex] = useState();
  const { movies, activeMovieId, setActiveMovieId } = props;
  return (
    <div className="absolute right-8 bottom-[10%]">
      <ul className="flex gap-1">
        {movies.map((movie) => (
          <li
            key={movie.id}
            onClick={() => {
              setActiveMovieId(movie.id);
            }}
            className={`w-6 h-1  cursor-pointer ${
              movie.id === activeMovieId ? "bg-slate-100" : "bg-slate-600"
            }`}
          ></li>
        ))}
        {/* <li className="w-6 h-1 bg-slate-100 cursor-pointer"></li>
        <li className="w-6 h-1 bg-slate-600 cursor-pointer"></li>
        <li className="w-6 h-1 bg-slate-600 cursor-pointer"></li>
        <li className="w-6 h-1 bg-slate-600 cursor-pointer"></li> */}
      </ul>
    </div>
  );
};

export default PaginateIndicator;
