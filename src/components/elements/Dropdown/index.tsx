import { Icon } from "@iconify/react";

type DropdownElementProps = {
    title: string;
    numberBadge?: number;
}

export default function DropdownElement({ title, numberBadge }: DropdownElementProps) {
    const hasBadge = typeof numberBadge === "number";
    return (
        <div className="flex justify-between items-center w-full bg-white rounded-lg border border-slate-400 p-4 shadow-sm mb-3 cursor-pointer hover:bg-slate-100">
            <h5 className="font-semibold text-slate-800">{ title }</h5>
            <div className={hasBadge ? "flex items-center" : ""}>
                {hasBadge && (
                    <span className="text-sm py px-3 rounded-l-full rounded-r-full bg-slate-200">{numberBadge}</span>
                )}
                    <Icon icon="basil:caret-right-outline" className="text-3xl" />
                </div>
        </div>
    );
}