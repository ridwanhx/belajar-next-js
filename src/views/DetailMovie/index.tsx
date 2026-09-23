import { movieType } from "@/types/movie.type";
import styles from "./DetailMovie.module.scss"
import CircularRating from "@/components/elements/Range";
import { Icon } from "@iconify/react";

export default function MovieDetailViews({ movie }: { movie: movieType }) {
  return (
    <div className={styles.detailMovie__content}> 
      <div className="p-4 sm:p-8">
        <div className="grid md:grid-cols-6 gap-6 md:gap-8">
          <div className="col-span-6 md:col-span-2 flex justify-center md:items-start lg:items-center">
            <img
            src={movie.poster && movie.poster}
            alt="movie poster"
            className="w-full max-w-sm md:max-w-none rounded-xl max-h-screen object-cover"
          />
            </div>
          <div className="col-span-6 md:col-span-4">
            <div className="flex flex-col gap-6 sm:gap-2 justify-between h-full">

              {/* Title */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-white cursor-pointer hover:underline hover:underline-offset-3 text-shadow-2xs">
                        {movie.title}
                      </h3>
                      <span className="text-2xl text-white text-shadow-2xs">
                      ({movie.release_date?.seconds
                    ? new Date(movie.release_date.seconds * 1000).getFullYear()
                    : "N/A"})
                      </span>
                </div>

                {/* Rating age & Release Date */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-md">
                      <span className="text-md text-slate-100 border rounded px-1.5 py-0.5">
                        {movie.rating_age ?? "N/A"}
                      </span>
                      <span className="text-white">
                        {movie.release_date?.seconds ? new Date(movie.release_date.seconds * 1000).toLocaleDateString('en-GB') : "N/A"}
                      </span>
                      <div className="hidden sm:block w-1 h-1 bg-white rounded-full" />
                      <span className="text-white capitalize">
                        {movie.category.join(", ") || "N/A"}
                      </span>
                </div>
              </div>

              {/* User score */}
              <div>
                <div className="flex items-center w-full max-w-xs">
                  <CircularRating value={movie.rating} />
                  <h5 className=" ml-3.5 text-lg font-bold text-slate-100">User Score</h5>
                </div>
              </div>

              {/* Quote */}
              <div className="flex relative items-center">
                <Icon icon={"boxicons:quote-left-filled"} className="text-slate-200/50 text-lg scale-125 absolute -top-0.5"/>
                <blockquote className="text-lg text-[#BFBAD4] font-medium italic pl-6">
                  {movie.quote ?? "Data not available"}
                </blockquote>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-xl font-semibold text-slate-100 text-shadow-2xs mb-1">Overview</h3>
                <p className="text-slate-100 text-shadow-2xs text-sm sm:text-base leading-relaxed">{ movie.synopsis ?? "N/A" }</p>
              </div>

              {/* Director */}
              <div>
                <h5 className="text-md font-semibold underline underline-offset-4 text-slate-100 text-shadow-2xs">{ movie.director }</h5>
                <span className="text-sm text-slate-100 text-shadow-2xs block">Director</span>
              </div>

              {/* casts */}
              <div>
                <h4 className="text-md font-semibold text-slate-100 mb-2">Casts</h4>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                {movie.casts && movie.casts.map((cast, index) => (  
                <div key={index}>
                  <h5 className="text-md font-semibold underline underline-offset-4 text-slate-100 text-shadow-2xs">{ cast.name }</h5>
                    <span className="text-sm text-slate-100 text-shadow-2xs block">as { cast.role }</span>
                </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
