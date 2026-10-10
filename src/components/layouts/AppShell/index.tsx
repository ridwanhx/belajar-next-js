import React from "react";
import Navbar from "../Navbar";
import { useRouter } from "next/router";
import SubNavbar from "../SubNavbar";
// import next font
import { Poppins } from "next/font/google";

// import Navbar secara dynamic
// memungkinakan komponen akan di load secara lazy load
// import dynamic from "next/dynamic";
// inisialisasi dynamic import untuk komponen navbar
// const Navbar = dynamic(() => import("../Navbar"));

// aturan di typescript mengharuskan kita untuk mendefinisikan type props terlebih dahulu ketika ingin menggunakan props sebagai parameter pada function
type AppShellProps = {
    children: React.ReactNode
}

// disable navbar
// inisialisasi variabel di halaman mana saja tampilan navbar ini akan di disable
const disableNavbar = ["/auth/login", "/auth/register", "/404"];
const disableSubNavbar = ["/movie/[movie]"];

// inisialisasi penggunaan font
const poppins = Poppins({
    subsets: ['latin'],
    weight: ["400", "600"],  // reguler
})

export default function AppShell(props: AppShellProps) {
    const { children } = props;
    // inisialisasi router untuk mendapatkan pathname
    const { pathname } = useRouter();
    return (
        // penerapan font ke seluruh halaman
        <main className={poppins.className}>
            {/* lakukan conditional rendering */}
            {/* cek apakah didalam disableNavbar tidak mengandung nama path/pathname yang sudah didaftarkan */}
            {!disableNavbar.includes(pathname) && <Navbar/>}
            {disableSubNavbar.includes(pathname) && <SubNavbar/>}
            {children}
        </main>
    );
};