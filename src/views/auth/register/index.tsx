import Link from "next/link";
// implementasi pemanggilan className yang didefinisikan menggunakan snake-case
import authStyle from "@/views/auth/Auth.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterViews() {
  // inisialisasi state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const { push } = useRouter();


  // sebelum view, tambahkan event handler berikut
  const handleSubmit = async (event: any) => {
    // kondisi awal / reset event (perlu di definisikan di paling awal karena ini berkaitan dengan me-reset kembali event ke kondisi semula)
    // jalankan prevent default (me-reset karakteristik default dari suatu elemen yang sedang berjalan)
    event.preventDefault();
    // reset state set error
    setError("")
    // set is loading menjadi true
    setIsLoading(true);

    // ambil setiap value yang di inputkan melalui input masing-masing
    const data = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    // fetching ke api register
    const result = await fetch("/api/register", {
      // inisialisasi method (penting karena jika ini tidak di inisialisasikan, nantinya api akan mengembalikan status 405 / not allowed)
      method: "POST",
      // inisialsiasikan juga headers, berisi content type
      headers: {
        "Content-Type": "application/json",
      },
      // body berisi json yang sudah di konversi menjadi string
      body: JSON.stringify(data)
    });

    // jika status mengembalikan status code 200, maka
    if (result.status === 200) {
      // kosongkan kembali semua field input
      event.target.reset();
      // set is loading menjadi false
      setIsLoading(false);
      // redirect ke halaman /auth/login
      push("/auth/login");
    } else {
      // set is loading menjadi false
      setIsLoading(false);
      // inisialisasi set error, dibungkus kedalam bentuk ternary condition, dengan masing-masing kondisi mengembalikan nilai berupa pesan dalam bentuk string
      setError(result.status === 400 ? "Email already exists" : "");
    }
  };

  return (
    <div className={authStyle["container"]}>
      <form className={authStyle["form-group"]} onSubmit={handleSubmit}>
        <div className={authStyle["mb-3"]}>
          <h3 className={authStyle["form-header"]}>Form Register</h3>
        </div>
        {/* tampilkan pesan error */}
        {error && (
          <div className="mb-3">
            <p className="p-4 border-red-400 border text-amber-100 bg-red-400">Register failed</p>
          </div>
        )}
        <div className={authStyle["mb-3"]}>
          <label htmlFor="fullName" className={authStyle["form-label"]}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={authStyle["form-input"]}
            required
            placeholder="Your Full Name"
          />
        </div>
        <div className={authStyle["mb-3"]}>
          <label htmlFor="email" className={authStyle["form-label"]}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={authStyle["form-input"]}
            autoComplete="off"
            autoFocus
            required
            placeholder="Your Email"
          />
        </div>
        <div className={authStyle["mb-3"]}>
          <label htmlFor="password" className={authStyle["form-label"]}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={authStyle["form-input"]}
            required
            placeholder="Your Password"
          />
        </div>
        <button
          type="submit"
          className={authStyle["btn-primary"]}
          // pada saat kondisi masih isLoading, disable button
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
        <div className={authStyle["form-footer"]}>
          <span className={authStyle["text-footer"]}>Have an account? </span>
          <Link href="/auth/login" className={authStyle["anchor-footer"]}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
