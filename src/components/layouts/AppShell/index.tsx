import React from "react";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

// aturan di typescript mengharuskan kita untuk mendefinisikan type props terlebih dahulu ketika ingin menggunakan props sebagai parameter pada function
type AppShellProps = {
    children: React.ReactNode
}

// disable navbar
// inisialisasi variabel di halaman mana saja tampilan navbar ini akan di disable
const disableNavbar = ["/auth/login", "/auth/register"];

export default function AppShell(props: AppShellProps) {
    const { children } = props;
    // inisialisasi router untuk mendapatkan pathname
    const { pathname } = useRouter();
    return (
        <main>
            {/* lakukan conditional rendering */}
            {/* cek apakah didalam disableNavbar tidak mengandung nama path/pathname yang sudah didaftarkan */}
            {!disableNavbar.includes(pathname) && <Navbar/>}
            {children}
        </main>
    );
};