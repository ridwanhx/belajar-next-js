import { fetcher } from "@/lib/swr/fetcher";
import { movieType } from "@/types/movie.type";
import MovieDetailViews from "@/views/DetailMovie";
import Head from "next/head";
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
            {/* beri kondisi jika isLoading gagal / data tidak berhasil di load */}
            {/* <MovieDetailViews movie={isLoading ? [] : data.data}/> */}

            {/* Server-Side Rendering */}
            {/* <MovieDetailViews movie={movie} /> */}

            {/* Static Side Generation */}
            <Head>
                <title>Detail Movie</title>
            </Head>
            <MovieDetailViews movie={movie} />
        </>
    );
}

// Eps. 10 - Rendering Dynamic Routes
// implementasi fetching data movie berdasarkan id menggunakan Server-Side Rendering
// export async function getServerSideProps({params}: {params: {movie: string}}) {
//   const res = await fetch(`http://localhost:3000/api/movie/${params.movie}`);
//   const response = await res.json();
//   return {
//     props: {
//       movie: response.data,
//     },
//   };
// }


// Eps. 10 - Rendering Dynamic Routes
// implementasi fetching data movie berdasarkan id menggunakan Static Site Generation
// Dalam implementasinya, untuk fetching data menggunakan teknik rendering yaitu Static-Side Generation, kita perlu mendaftarkan terlebih dahulu paths nya, karena Static-Side ini berjalan saat build-time, dan pada saat build-time otomatis tidak bisa akses ke http://localhost:3000/api/movie, maka inisialisasi ini dilakukan di dalam method yang berbeda yaitu getStaticPaths()
export async function getStaticPaths() {
    // fetching response dari movie api
    const res = await fetch("http://localhost:3000/api/movie");
    // konversi response menjadi json
    const response = await res.json();

    // inisialisasi paths
    // pastikan parameter yang dikirim melalui url adalah berupa movie id, sehingga jika nantinya ada yang mengirimkan request dengan nilai id yang tidak terdaftar/salah, akan otomatis diarahkan ke halaman 404
    const paths = response.data.map((movie: movieType) => ({
        params: {
            movie: movie.id
        }
    }))

    // kembalikan 2 object yaitu paths dan fallbacknya beri nilai false
    return {paths, fallback: false};
}
// inisialisasi props
// ini merupakan tahapan fetching dimana nantinya method ini akan mengembalikan sebuah props dengan nama movie, yang kemudian akan dipanggil nanti pada saat pemanggilan view:
//  <MovieDetailViews movie={movie} />
export async function getStaticProps({params}: {params: { movie: string }}) {
    // lakukan fetching ke api/movie
    const res = await fetch(`http://localhost:3000/api/movie/${params.movie}`);
    // inisialisasi response nya kedalam bentuk json
    const response = await res.json();

    return {
        props: {
            movie: response.data,
        }
    }
}