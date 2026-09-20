import { fetcher } from "@/lib/swr/fetcher";
import { movieType } from "@/types/movie.type";
import MovieDetailViews from "@/views/DetailMovie";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function MovieDetailPage({ movie }: {movie: movieType}) {
    const { query } = useRouter();

    // Eps. 10 - Rendering Dynamic Routes
    // implementasi fetching data movie berdasarkan id menggunakan Client-Side Rendering
    // const { data, error, isLoading } = useSWR(`/api/movie/${query.movie}`, fetcher)

    return (
        <>
            {/* Client-Side Rendering */}
            {/* <MovieDetailViews movie={isLoading ? [] : data.data}/> */}

            {/* Server-Side Rendering */}
            <MovieDetailViews movie={movie} />
        </>
    );
}

// Eps. 10 - Rendering Dynamic Routes
// implementasi fetching data movie berdasarkan id menggunakan Server-Side Rendering
export async function getServerSideProps({params}: {params: {movie: string}}) {
  const res = await fetch(`http://localhost:3000/api/movie/${params.movie}`);
  const response = await res.json();
  return {
    props: {
      movie: response.data,
    },
  };
}