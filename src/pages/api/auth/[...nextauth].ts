import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// inisialisasi authOptions dengan tipe NextAuthOptions
const authOptions: NextAuthOptions = {
    // 1. inisialisasi session / session strategy sebagai jwt
    session: {
        strategy: "jwt",
    },

    // 2. inisialisasi secret string
    // berupa string acak / hasil hash, bisa didapat misal, dari:
    // https://generate.plus/en/base64
    // best practice nya, simpan di file .env
    secret: process.env.NEXTAUTH_SECRET,

    // 3. inisialisasi providers
    providers: [
        // konfigurasi credentials provider
        CredentialsProvider({
            // inisialisasi type
            // sebenarnya tidak harus mengikuti seperti contoh di bawah untuk pasangan key: value nya, seharusnya bebas dan disesuaikan saja.
            type: "credentials",
            name: "Credentials",

            // tahap inisialisasi kredensial
            credentials: {
                // tentukan attribute dari masing-masing kredensial
                // merupakan kredensial yang akan ditampilkan di halaman signIn (next-auth/react)
                // tempat kita mendeklarasikan "view" nya
                // fullname: { label: "Full Name", type: "text", placeholder: "Your full name", autoFocus: true },

                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            // jalankan async authorize dengan parameternya ialah credentials yang sudah kita definisikan sebelumnya
            async authorize(credentials) {
                // inisialisasi tipe untuk masing-masing kredensial
                // tempat kita menangkat nilai yang dikirim melalui "view" nya
                const { email, password } = credentials as {
                    email: string,
                    password: string,
                };

                // inisialisasi atribut user
                const user : any = await signIn({ email });

                // beri kondisi
                if (user) {
                    // komparasi nilai password yang dikirimkan user dengan nilai password yang tersimpan di database
                    const passwordConfirm = await compare(password, user.password)

                    // beri kondisi
                    if (passwordConfirm) {
                        return user;
                    }
                    return null
                } else {
                    return null;
                }
            }
        }),

        // Eps. 16 - Login Google
        // konfigurasi google provider
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
        })
    ],

    // 4. inisialisasi callbacks
    callbacks: {
        // inisialisasi jwt (JSON Web Token)
        async jwt({ token, account, profile, user }: any) {
            // berikan kondisi, jika account provider adalah "credentials"
            if (account?.provider === "credentials") {
                // asosiasi nilai token.email dari user.email
                token.fullname = user.fullname;
                token.email = user.email;
                token.role = user.role;
            }

            // inisialisasi logic jika login menggunakan google
            if (account?.provider === "google") {
                // inisialisasi 3 atribut wajib + 1 atribut opsional (tapi sangat disarankan)
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: "google"
                }

                // jalankan signInWithGoogle
                await signInWithGoogle(data, (result: {
                    status: boolean,
                    message: string,
                    data: any
                }) => {
                    // result merepresentasikan callback, dan pada kondisi ini, kita akan menjadikan status yang dihasilkan oleh callback sebagai parameter kondisi
                    if (result.status.true) {
                        token.email = result.data.email;
                        token.fullname = result.data.fullname;
                        token.type = result.data.type;
                        token.image = result.data.image;
                        token.role = result.data.role;
                    }
                })
            }
            return token;
        },

        // jalankan async session
        // session dikirimkan dengan membawa nilai yang dihasilkan dari proses jwt diatas
        async session({ session, token }: any) {
            // jika di dalam token ada nilai "fullname" (mencari jarum dalam jerami)
            if ("fullname" in token) {
                // asosiasi nilai token.fullname kedalam session
                session.user.fullname = token.fullname;
            }

            // inisialisasi jika di dalam token ada image
            if ("image" in token) {
                // asosiasi nilai token.image kedalam session
                session.user.image = token.image;
            }

            // jika di dalam token ada nilai "role" (mencari jarum dalam jerami)
            if ("role" in token) {
                // asosiasi nilai token.role kedalam session
                session.user.role = token.role;
            }
            // jika di dalam token ada nilai "email" (mencari jarum dalam jerami)
            if ("email" in token) {
                // asosiasi nilai token.email kedalam session
                session.user.email = token.email;
            }
            // kembalikan nilai session
            // console.log(session);
            return session;
        }
    },

    // Eps. 15 - Login Multi Role
    // inisialisasi pages
    pages: {
        // arahkan ke route login custom yang sebelumnya sudah kita siapkan
        signIn: "/auth/login"
    }
}

export default NextAuth(authOptions);