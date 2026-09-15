import navbarStyles from "./Navbar.module.scss"
export default function Navbar() {
    return (
        <nav className={navbarStyles.navbar}>
            <a href="#" className={navbarStyles.header}>Navbar</a>
            <ul className={navbarStyles.items}>
                <li><a href="#" className={navbarStyles.item}>Home</a></li>
                <li><a href="#" className={navbarStyles.item}>Service</a></li>
                <li><a href="#" className={navbarStyles.item}>About</a></li>
                <li><a href="#" className={navbarStyles.item}>Contact</a></li>
            </ul>
        </nav>
    );
}