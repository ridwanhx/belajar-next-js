import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss"
import {Icon} from "@iconify/react"
export default function Navbar() {
    // ambil data yang dikirimkan melalui session
    const { data }: any = useSession();
    console.info(data)

    return (
        <nav className={styles.navigations__navbar}>
            <div className="flex items-center gap-8">
                <a href="#" className={styles.navigations__header}>MYMDB</a>
                <ul className={styles.navigations__items}>
                    <li><a href="#" className={styles.navigations__item}>Home</a></li>
                    <li><a href="#" className={styles.navigations__item}>Service</a></li>
                    <li><a href="#" className={styles.navigations__item}>About</a></li>
                    <li><a href="#" className={styles.navigations__item}>Contact</a></li>
                </ul>
            </div>
            <ul className="flex items-center gap-8 flex-row-reverse font-semibold">
                <li>
                    {data ? (    
                        <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-9 h-9 bg-indigo-400 rounded-full border-2">
                                { data.user.fullName.split(" ").map((name: string) => name.slice(0, 1)).join("")}
                            </span>
                            <div className="flex flex-col">
                                <small className="text-xs font-bold">{ data.user.fullName }</small>
                                <small className="font-light text-[9px]">{data.user.role}</small>
                            </div>
                        </div>
                    ) : (
                            <div className="block"/>
                    )}
                </li>
                <li>
                    {data ? (
                        <button onClick={() => signOut()} className="capitalize tracking-tight">Sign Out</button>
                    ) : (
                        <button onClick={() => signIn()} className="capitalize tracking-tight">Sign In</button>
                    )}
                    </li>
                    <li>
                        <a href="#" className="uppercase tracking-tight border p-1.5 rounded-sm text-sm">en</a>
                </li>
                <li>
                        <Icon icon={"at-icons:plus"} className="text-2xl cursor-pointer" />
                    </li>
            </ul>
        </nav>
    );
}