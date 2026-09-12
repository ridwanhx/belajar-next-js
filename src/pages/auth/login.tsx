import Link from "next/link";
import { useRouter } from "next/router";

const LoginPage = () => {
    // implementasi imperative routing
    const { push } = useRouter();
    // inisialisasi handler 
    const handlerLogin = () => {
        push('/shop');
    }
    return (
        <>
            <form className="form-group">
                <div className="mb-3">
                    <h3 className="form-header">Form Login</h3>
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" autoComplete="off" autoFocus />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <button type="button" onClick={handlerLogin}>Submit</button>
                <div className="form-footer">
                    <span>Belum punya akun? </span>
                    <Link href="/auth/register">Registrasi</Link>
                </div>
            </form>
        </>
    );
}

export default LoginPage;