import { Icon } from "@iconify/react";
import DropdownElement from "@/components/elements/Dropdown";
import { SearchButton } from "@/components/elements/Button";
import styles from "./Movie.module.scss";
import { movieType } from "@/types/movie.type";
import Link from "next/link";

export default function MovieViews({ movies }: { movies: movieType[] }) {
  return (
    <div className="px-9 py-6">
      <h1 className="text-lg md:text-3xl mb-3">Movie Page</h1>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <div className="flex-col gap-4">
            <DropdownElement title="Sort" />
            <DropdownElement title="Where to watch" numberBadge={48} />
            <DropdownElement title="Filters" />
            <SearchButton title="Search" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.length > 0 ? (
              <>
                {movies.map((movie: movieType, index: number) => (
                  // Eps. 10 - Rendering Dynamic Routes
                  // mengganti tag dari <a> ke <Link> dengan attr href mengarah ke halaman /movie/:movie.id
                  <Link href={`/movie/${movie.id}`}
                    className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer"
                    key={movie.id || index}
                  >
                    <img src={movie.poster} alt="img-1" className="w-full" />
                    <div className="flex-col p-4">
                      <h3 className="text-sm md:text-md lg:text-lg font-semibold text-slate-800 capitalize">
                        {movie.title ?? "N/A"}
                      </h3>
                      <small className="text-xs lg:text-sm block mb-3 capitalize text-slate-400">
                        {movie.category && movie.category.join(", ")}
                      </small>
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm lg:text-md font-light text-slate-400">
                          {/* konversi timestamps firebase ke local date string */}
                          {/* format: Jun 31, 2026 */}
                          {movie.release_date?.seconds
                            ? new Date(
                                movie.release_date.seconds * 1000,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "N/A"}
                        </span>
                        <div className="flex justify-between items-center rounded-l-full rounded-r-full gap-1 lg:gap-2">
                          <Icon
                            icon={"basil:star-solid"}
                            className="text-amber-400"
                          />
                          <span className="text-xs md:text-sm lg:text-md text-slate-800">
                            {movie.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className={styles.movie__content__skeleton} key={index}>
                    <div className={styles.movie__content__skeleton__image} />
                    <div className={styles.movie__content__skeleton__title} />
                    <div
                      className={styles.movie__content__skeleton__category}
                    />
                    <div className={styles.movie__content__skeleton__meta}>
                      <div
                        className={
                          styles.movie__content__skeleton__release_date
                        }
                      />
                      <div
                        className={styles.movie__content__skeleton__rating}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
