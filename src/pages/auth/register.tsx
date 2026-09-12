import Link from "next/link";

const RegisterPage = () => {
    return (
        <>
            <form className="form-group">
                <div className="mb-3">
                    <h3 className="form-header">Form Register</h3>
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" autoComplete="off" autoFocus />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="repeat-password">Repeat Password</label>
                    <input type="password" id="repeat-password" />
                </div>
                <button type="button">Submit</button>
                <div className="form-footer">
                    <span>Sudah punya akun? </span>
                    <Link href="/auth/login">Login</Link>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;