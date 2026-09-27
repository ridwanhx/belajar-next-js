import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
                // best practice nya harusnya mengacu langsung pada data real yang ada di database, hanya saja untuk implementasi kali ini kita akan gunakan data static
                const user: any = { id: 1, email: email, password: password };
                // beri kondisi, jika data user ada, maka kembalikan data user, jika data user tidak ada, kembalikan null
                if (user) {
                    console.log(user);
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],

    // 4. inisialisasi callbacks
    callbacks: {
        // inisialisasi jwt (JSON Web Token)
        jwt({ token, account, profile, user }) {
            // berikan kondisi, jika account provider adalah "credentials"
            if (account?.provider === "credentials") {
                // asosiasi nilai token.email dari user.email
                token.email = user.email
            }
            console.log(token);
            return token;
        },

        // jalankan async session
        // session dikirimkan dengan membawa nilai yang dihasilkan dari proses jwt diatas
        async session({ session, token }: any) {
            // jika di dalam token ada nilai "email" (mencari jarum dalam jerami)
            if ("email" in token) {
                // asosiasi nilai token.email kedalam session
                session.user.email = token.email;
            }
            // kembalikan nilai session
            console.log(session);
            return session;
        }
    }
}

export default NextAuth(authOptions);