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
        },

        // Eps. 11 - Incremental Static Regeneration
        // menambahkan trigger untuk melakukan regeneration terhadap data fetch
        // revalidate: 10
        
        // kita juga bisa melakukan revalidasi ini secara manual
        // implementasi ada di direktori src\pages\api\revalidate.ts
    }
}