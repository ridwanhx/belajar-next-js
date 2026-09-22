import {Icon} from "@iconify/react"

export default function SubNavbar() {
    return (
        <nav className="w-full p-4 shadow-sm">
            <ul className="flex gap-8 justify-center text-sm">
                <li className="flex items-center gap-1.2 hover:text-slate-400">
                    <a href="">Overview</a>
                    <Icon icon={"basil:caret-down-outline"} className="text-lg"/>
                </li>
                <li className="flex items-center gap-1.2 hover:text-slate-400">
                    <a href="">Media</a>
                    <Icon icon={"basil:caret-down-outline"} className="text-lg"/>
                </li>
                <li className="flex items-center gap-1.2 hover:text-slate-400">
                    <a href="">Fandom</a>
                    <Icon icon={"basil:caret-down-outline"} className="text-lg"/>
                </li>
                <li className="flex items-center gap-1.2 hover:text-slate-400">
                    <a href="">Share</a>
                    <Icon icon={"basil:caret-down-outline"} className="text-lg"/>
                </li>
            </ul>
        </nav>
    );
}