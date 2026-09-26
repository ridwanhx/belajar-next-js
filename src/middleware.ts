import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // redirect setiap kali ada yang mencoba mengakses url yang sudah didefinisikan di config agar kembali ke halaman awal atau "localhost:3000/"

    // implementasi konsep autentikasi sederhana menggunakan middleware
    const isLogin = false;

    if (isLogin) {
        // jika sudah login, maka boleh next ke halaman yang dituju
        return NextResponse.next()
    } else {
        // jika belum login, redirect kembali ke halaman login
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    // baris matcher ini digunakan untuk mendefinisikan halaman mana yang mau kita redirect / untuk menjalankan baris program middleware yang sudah kita definisikan diatas, mau di halaman mana saja
    // sehingga nantinya, setiap kita mencoba mengakses halaman yang kita definisikan pada matcher ini, otomatis akan menjalankan baris kode middleware diatas
    matcher: ["/movie", "/about", "/product"]
}