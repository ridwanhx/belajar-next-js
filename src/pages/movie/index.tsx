import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// inisialisasi type
type CastMember = {
  id: number;
  name: string;
  role: string;
};
type movieType = {
  id: number;
  title: string;
  category: string[];
  director: string;
  casts: CastMember[];
  rating: number;
};

export default function MoviePage() {
  // inisialisasi push
  const { push } = useRouter();
  // inisialisasi state
  const [isLogin, setIsLogin] = useState(true);
  const [movies, setMovies] = useState([]);

  // inisialisasi effect, login validation
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  // inisialisasi effect, fetching movie api
  useEffect(() => {
    // fetch("url api yang dituju")
    fetch("/api/movie")
      // lakukan perulangan untuk setiap data yang dihasilkan dari hasil fetching tersebut, dan sajikan tiap data nya dalam bentuk json (json response)
      .then((res) => res.json())
      // tampilkan data pada console (debugging)
      .then((response) => setMovies(response.data));
  }, []);
  return (
    <div className="p-9 h-screen">
      <h1 className="text-3xl mb-3">Movie Page</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700">No.</th>
              <th className="px-6 py-3 font-medium text-gray-700">Judul</th>
              <th className="px-6 py-3 font-medium text-gray-700">Kategori</th>
              <th className="px-6 py-3 font-medium text-gray-700">Sutradara</th>
              <th className="px-6 py-3 font-medium text-gray-700">Pemeran</th>
              <th className="px-6 py-3 font-medium text-gray-700">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {movies.map((movie: movieType, index: number) => (
              <tr
                key={movie.id || index}
                className="hover:bg-amber-400 cursor-pointer transition-colors duration-150"
              >
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {movie.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {movie.category.join(", ")}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {movie.director}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {movie.casts.map((cast) => (
                    <ul>
                      <li key={cast.id}>
                        {cast.name} as {cast.role}
                      </li>
                    </ul>
                  ))}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  ⭐ {movie.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
