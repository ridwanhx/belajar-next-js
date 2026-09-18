import MovieViews from "@/views/Movie";
import { movieType } from "../../types/movie.type";

const MoviePage = (props: { movies: movieType[] }) => {
  const { movies } = props;
  return <MovieViews movies={movies} />;
};

export default MoviePage;

// dipanggil setiap melakukan request
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/movie");
  const response = await res.json();
  return {
    props: {
      movies: response.data,
    },
  };
}
