import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

// inisialisasi only admin access
const onlyAdmin = ["/admin"];

// inisialisasi method withAuth
export default function withAuth(
    // inisialisasi middleware
    middleware: NextMiddleware,
    // siapkan wadah untuk menampung setiap route yang perlu autentikasi terlebih dahulu
    requireAuth: string[] = []
) {
    // kembalikan async
    return async (req: NextRequest, next: NextFetchEvent) => {
        // ambil nilai pathname berdasarkan request yang dikirimkan
        const pathname = req.nextUrl.pathname;
        // berikan kondisi
        // jika didalam requireAuth terdapat pathname yang sama / pathname (route) tersebut sudah dipasangi middleware, maka
        if (requireAuth.includes(pathname)) {
            // ambil nilai token-nya
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            });

            // jika belum login / belum dapat token
            if (!token) {
                // redirect kembali ke halaman form login
                const url = new URL("/auth/login", req.url);

                // redirect ke halaman dimana tombol sign in terakhir kali ditekan
                // secara otomatis akan me-redirect kembali ke halaman di mana terakhir kali tombol sign in ditekan setelah melakukan login
                url.searchParams.set("callbackUrl", encodeURI(req.url));
                return NextResponse.redirect(url);
            }

            // beri kondisi
            // hanya admin / user dengan role "admin" yang bisa mengakses halaman / route berikut
            // jika saya tidak punya role admin, dan saya saat ini sedang berada di halaman yang admin only
            if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
                // redirect ke halaman home / halaman paling depan
                return NextResponse.redirect(new URL("/", req.url));
            }

            // jika memenuhi kondisi pertama (sudah login / punya token), boleh lanjut
            return middleware(req, next)
        }
    }
}