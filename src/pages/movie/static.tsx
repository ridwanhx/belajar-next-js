import { movieType } from "@/types/movie.type";
import MovieViews from "@/views/Movie"

const MoviePage = (props: { movies: movieType[] }) => {
    const { movies } = props;
    return <MovieViews movies={movies} />
}

export default MoviePage;

// inisialisasi fetching data menggunakan async function getStaticProps
export async function getStaticProps() {
    // lakukan fetching ke api/movie
    const res = await fetch("http://localhost:3000/api/movie");
    // inisialisasi response nya kedalam bentuk json
    const response = await res.json();

    return {
        props: {
            movies: response.data,
        }
    }
}