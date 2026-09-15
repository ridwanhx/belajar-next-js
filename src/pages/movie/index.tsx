import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Timestamp } from "firebase/firestore";

// inisialisasi type
type CastMember = {
  id: number;
  name: string;
  role: string;
};
type movieType = {
  id: number;
  title: string;
  category: string[];
  director: string;
  casts: CastMember[];
  rating: number;
  poster: string;
  release_date: Timestamp;
};

export default function MoviePage() {
  // inisialisasi push
  const { push } = useRouter();
  // inisialisasi state
  const [isLogin, setIsLogin] = useState(true);
  const [movies, setMovies] = useState([]);

  // inisialisasi effect, login validation
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  // inisialisasi effect, fetching movie api
  useEffect(() => {
    // fetch("url api yang dituju")
    fetch("/api/movie")
      // lakukan perulangan untuk setiap data yang dihasilkan dari hasil fetching tersebut, dan sajikan tiap data nya dalam bentuk json (json response)
      .then((res) => res.json())
      // tampilkan data pada console (debugging)
      .then((response) => setMovies(response.data));
  }, []);

  return (
    <div className="px-9 py-6">
      <h1 className="text-lg md:text-3xl mb-3">Movie Page</h1>
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <div className="flex-col gap-4">
            <div className="flex justify-between items-center w-full bg-white rounded-lg border border-slate-400 p-4 shadow-sm mb-3 cursor-pointer hover:bg-slate-100">
              <h5 className="font-semibold text-slate-800">Sort</h5>
              <Icon icon="basil:caret-right-outline" className="text-3xl" />
            </div>
            <div className="flex justify-between items-center w-full bg-white rounded-lg border border-slate-400 p-4 shadow-sm mb-3 cursor-pointer hover:bg-slate-100">
              <h5 className="font-semibold text-slate-800">Where to watch</h5>
              <div className="flex items-center">
                <span className="text-sm py px-3 rounded-l-full rounded-r-full bg-slate-200">48</span>
                <Icon icon="basil:caret-right-outline" className="text-3xl" />
              </div>
            </div>
            <div className="flex justify-between items-center w-full bg-white rounded-lg border border-slate-400 p-4 shadow-sm mb-3 cursor-pointer hover:bg-slate-100">
              <h5 className="font-semibold text-slate-800">Filters</h5>
              <Icon icon="basil:caret-right-outline" className="text-3xl" />
            </div>
            <button className="w-full p-4 border border-slate-400 bg-slate-100 rounded-l-full rounded-r-full mt-6 mb-3 shadow-sm">
              <span className="text-lg font-semibold text-slate-600">Search</span>
            </button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie: movieType, index: number) => (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer" key={movie.id || index}>
              <img src={movie.poster} alt="img-1" className="w-full" />
              <div className="flex-col p-4">
                  <h3 className="text-sm md:text-md lg:text-lg font-semibold text-slate-800 capitalize">{ movie.title }</h3>
                  <small className="text-xs lg:text-sm block mb-3 capitalize text-slate-400">{ movie.category.join(", ") }</small>
                <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm lg:text-md font-light text-slate-400">
                      {/* konversi timestamps firebase ke local date string */}
                      {/* format: Jun 31, 2026 */}
                      {movie.release_date?.seconds ? new Date(movie.release_date.seconds * 1000).toLocaleDateString("en-US", {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : "N/A"}
                    </span>
                  <div className="flex justify-between items-center rounded-l-full rounded-r-full gap-1 lg:gap-2">
                    <Icon icon={"basil:star-solid"} className="text-amber-400" />
                    <span className="text-xs md:text-sm lg:text-md text-slate-800">
                      {movie.rating}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}