import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

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
                // lempar / redirect kembali ke halaman awal / localhost:3000/
                const url = new URL("/", req.url);
                return NextResponse.redirect(url);
            }
            // jika memenuhi kondisi pertama (sudah login / punya token), boleh lanjut
            return middleware(req, next)
        }
    }
}