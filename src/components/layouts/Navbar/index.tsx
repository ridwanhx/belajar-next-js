import styles from "./Navbar.module.scss"
import {Icon} from "@iconify/react"
export default function Navbar() {
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
                        <Icon icon={"bi:search"} className="text-2xl cursor-pointer" />
                    </li>
                    <li>
                        <a href="#" className="capitalize tracking-tight">join <span className="uppercase">mymdb</span></a>
                    </li>
                    <li>
                        <a href="#" className="capitalize tracking-tight">Login</a>
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