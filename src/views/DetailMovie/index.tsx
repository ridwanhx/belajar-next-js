import { movieType } from "@/types/movie.type";

export default function MovieDetailViews({ movie }: { movie: movieType }) {
  return (
    <div className="py-6 px-9">
      <h1>Detail Movie</h1>
      <ul>
        <li>
          <img
            src={movie.poster}
            alt="movie poster"
            className="w-40"
          />
        </li>
        <li>{movie.title}</li>
        <li>{movie.category && movie.category.join(", ")}</li>
        <li>{movie.casts && movie.casts.map((cast) => ( `${cast.name} as ${cast.role}` )).join(", ")}</li>
        <li>
          {movie.release_date?.seconds
            ? new Date(movie.release_date.seconds * 1000).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              )
            : "N/A"}
        </li>
        <li>{movie.rating}</li>
      </ul>
    </div>
  );
}
