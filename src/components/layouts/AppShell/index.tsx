import React from "react";
import Navbar from "../Navbar";

// aturan di typescript mengharuskan kita untuk mendefinisikan type props terlebih dahulu ketika ingin menggunakan props sebagai parameter pada function
type AppShellProps = {
    children: React.ReactNode
}

export default function AppShell(props: AppShellProps) {
    const { children } = props;
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
};