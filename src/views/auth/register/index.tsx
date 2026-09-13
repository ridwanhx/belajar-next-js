import Link from "next/link";
// implementasi pemanggilan className yang didefinisikan menggunakan snake-case
import authStyle from "@/views/auth/Auth.module.css";

export default function RegisterViews() {
  return (
    <div className={authStyle["container"]}>
      <form className={authStyle["form-group"]}>
        <div className={authStyle["mb-3"]}>
          <h3 className={authStyle["form-header"]}>Form Register</h3>
        </div>
        <div className={authStyle["mb-3"]}>
          <label htmlFor="email" className={authStyle["form-label"]}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={authStyle["form-input"]}
            autoComplete="off"
            autoFocus
          />
        </div>
        <div className={authStyle["mb-3"]}>
          <label htmlFor="password" className={authStyle["form-label"]}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={authStyle["form-input"]}
          />
        </div>
        <div className={authStyle["mb-3"]}>
          <label htmlFor="repeat-password" className={authStyle["form-label"]}>
            Repeat Password
          </label>
          <input
            type="password"
            id="repeat-password"
            className={authStyle["form-input"]}
          />
        </div>
        <button type="button" className={authStyle["btn-primary"]}>
          Submit
        </button>
        <div className={authStyle["form-footer"]}>
          <span className={authStyle["text-footer"]}>Sudah punya akun? </span>
          <Link href="/auth/login" className={authStyle["anchor-footer"]}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
