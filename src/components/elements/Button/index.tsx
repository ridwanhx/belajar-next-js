type buttonElementProps = {
    title: string
}

const SearchButton = ({ title }: buttonElementProps) => {
    return (
        <button className="w-full p-4 border border-slate-400 bg-slate-100 rounded-l-full rounded-r-full mt-6 mb-3 shadow-sm">
            <span className="text-lg font-semibold text-slate-600">{title}</span>
        </button>
    );
}

export { SearchButton };