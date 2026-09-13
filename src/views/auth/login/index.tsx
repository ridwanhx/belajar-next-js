import Link from "next/link";
import { useRouter } from "next/router";
import authStyle from '@/views/auth/Auth.module.css';

export default function LoginViews() {
    // implementasi imperative routing
    const { push } = useRouter();
    // inisialisasi handler 
    const handleLogin = () => {
        push('/shop');
    }
    return (
        <div className={authStyle["container"]}>
            <form className={authStyle["form-group"]}>
                <div className={authStyle["mb-3"]}>
                    <h3 className={authStyle["form-header"]}>Form Login</h3>
                </div>
                <div className={authStyle["mb-3"]}>
                    <label className={authStyle["form-label"]} htmlFor="email">Email</label>
                    <input className={authStyle["form-input"]} type="email" id="email" autoComplete="off" autoFocus />
                </div>
                <div className={authStyle["mb-3"]}>
                    <label className={authStyle["form-label"]} htmlFor="password">Password</label>
                    <input className={authStyle["form-input"]} type="password" id="password" />
                </div>
                <button type="button" className={authStyle["btn-primary"]} onClick={handleLogin}>Submit</button>
                <div className={authStyle["form-footer"]}>
                    <span className={authStyle["text-footer"]}>Belum punya akun? </span>
                    <Link href="/auth/register" className={authStyle["anchor-footer"]}>Registrasi</Link>
                </div>
            </form>
        </div>
    );
}