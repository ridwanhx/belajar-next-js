import {useRouter} from "next/router";
import { useEffect, useState } from "react";

export default function ShopPage() {
    // implementasi konsep checking validasi login, akan melempar balik pengguna yang mencoba akses ke halaman ini tanpa login (murni hanya skenario/konsep belum benar-benar mengimplementasikan konsepnya secara benar)
    // inisialisasi push dari useRouter
    const { push } = useRouter();
    // inisialisasi state
    const [isLogin, setIsLogin] = useState(true);
    console.log(isLogin);
    // inisialisasi use effect validasi login
    useEffect(() => {
        // jika belum login, lempar lagi ke halaman login
        if (!isLogin) {
            push('/auth/login')
        }
    }, [])
    const { query } = useRouter();
    console.log(query);
    return (
        <>
            <h1>Shop Page</h1>
            {/* kita juga bisa menginisiasikan handler/error handling dengan misal menambahkan penulisan ternary untuk handling kondisi misal ketika data tidak tersedia */}
            <h3>Shop: {` ${query.slug ? query.slug[0] + "-" + query.slug[1] : "Data not available"}`}</h3>
        </>
    );
}