import Link from "next/link";
import { useRouter } from "next/router";
import authStyle from '@/views/auth/Auth.module.css';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";

export default function LoginViews() {
    // inisialisasi state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // inisialisasi use router
    const { push, query } = useRouter();

    // inisialisasi callbackUrl
    // jika halaman mengirimkan callback :
    // http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F
    // jika hanya localhost:3000/auth/login, maka alihkan ke "/"
    const callbackUrl: any = query.callbackUrl || "/";

    // inisialisasi handler ketika tombol submit ditekan
    const handleSubmit = async (event: any) => {
        // reset event
        event.preventDefault();
        setError("");
        setIsLoading(true);

        // inisialisasi try-catch
        try {
            // jalankan signIn, yang akan mengirimkan kredensial berdasarkan nilai input yang dikirimkan pengguna mealui form login
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            // jika response berhasil / tidak menghasilkan error
            if (!res?.error) {
                setIsLoading(false);
                // redirect halaman ke callbackUrl
                push(callbackUrl);
            } else {
                setIsLoading(false);
                // berikan error response
                setError("Email or password is incorrect.");
            }
        } catch (error: any) {
            setIsLoading(false);
            setError("Email or password is incorrect.");
        }
    }
    return (
        <div className={authStyle["container"]}>
            <form className={authStyle["form-group"]} onSubmit={handleSubmit}>
                <div className={authStyle["mb-3"]}>
                    <h3 className={authStyle["form-header"]}>Form Login</h3>
                </div>
                {error && (
                    <div className="mb-3">
                        <p className="p-4 border-red-400 border text-amber-100 bg-red-400">{ error }</p>
                    </div>
                )}
                <div className={authStyle["mb-3"]}>
                    <label className={authStyle["form-label"]} htmlFor="email">Email</label>
                    <input className={authStyle["form-input"]} type="email" id="email" name="email" autoComplete="off" autoFocus required />
                </div>
                <div className={authStyle["mb-3"]}>
                    <label className={authStyle["form-label"]} htmlFor="password">Password</label>
                    <input className={authStyle["form-input"]} type="password" id="password" name="password" required />
                </div>
                <div className="flex flex-col gap-3">
                    <button type="submit" className={authStyle["btn-primary"]}>Sign In</button>

                    <div className="flex">
                        <div className="border-t border-slate-100 w-1/2 m-auto" />
                        <span className="text-white px-2">or</span>
                        <div className="border-t border-slate-100 w-1/2 m-auto"/>
                    </div>
                    
                    {/* Implementasi Login with google */}
                    <button onClick={() => signIn("google", {
                        callbackUrl,
                        redirect: false,
                    })} className="bg-white py-3.5 rounded-full flex items-center justify-center">
                        <Icon icon={"devicon:google"} />
                        <span className="ml-2">
                        Sign In with Google
                        </span>
                    </button>
                </div>
                <div className={authStyle["form-footer"]}>
                    <span className={authStyle["text-footer"]}>Haven't account yet? </span>
                    <Link href="/auth/register" className={authStyle["anchor-footer"]}>Register</Link>
                </div>
            </form>
        </div>
    );
}