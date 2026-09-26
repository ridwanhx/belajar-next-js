// pemanfaatan fetcher untuk fetching data, fetcher telah dipisahkan kedalam lib/swr/fetcher.ts
import { fetcher } from "@/lib/swr/fetcher";

import MovieViews from "@/views/Movie";
import Head from "next/head";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// implementasi penggunaan SWR untuk fetching data
// SWR merupakan alternatif lain untuk fetching data selain menggunakan useEffect
import useSWR from "swr";

export default function MoviePage() {
  // sudah di handle middleware
  // inisialisasi push
  // const { push } = useRouter();
  // inisialisasi state
  // const [isLogin, setIsLogin] = useState(true);

  // inisialisasi state movies, untuk fetching menggunakan useEffect()
  // const [movies, setMovies] = useState([]);

  // inisialisasi effect, login validation
  // useEffect(() => {
  //   if (!isLogin) {
  //     push("/auth/login");
  //   }
  // }, []);
  // tidak diperlukan lagi, karena sudah kita definisikan di middleware (Eps. 12 - Middleware)

  // // inisialisasi effect, fetching movie api
  // // before menggunakan swr
  // useEffect(() => {
  //   // fetch("url api yang dituju")
  //   fetch("/api/movie")
  //     // lakukan perulangan untuk setiap data yang dihasilkan dari hasil fetching tersebut, dan sajikan tiap data nya dalam bentuk json (json response)
  //     .then((res) => res.json())
  //     // tampilkan data pada console (debugging)
  //     .then((response) => setMovies(response.data));
  // }, []);

  const { data, error, isLoading } = useSWR(`/api/movie`, fetcher)

  return (
    <>
      <Head>
        <title>Movie Page</title>
      </Head>
      <MovieViews movies={isLoading ? [] : data.data} />
    </>
  );
}