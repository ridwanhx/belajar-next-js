import { useRouter } from "next/router";

export default function MovieDetailPage() {
    const { query } = useRouter();
    console.info(query.movie);

    return (
        <>
            <h1 className="text-3xl">Detail Movie</h1>
            <p>Movie: { query.movie }</p>
        </>
    );
}