import { fetcher } from "@/lib/swr/fetcher";
import MovieDetailViews from "@/views/DetailMovie";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function MovieDetailPage() {
    const { query } = useRouter();

    const { data, error, isLoading } = useSWR(`/api/movie/${query.movie}`, fetcher)

    return (
        <>
            <MovieDetailViews movie={isLoading ? [] : data.data}/>
        </>
    );
}