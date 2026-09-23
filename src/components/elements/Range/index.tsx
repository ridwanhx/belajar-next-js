type CircularType = {
    value: number,
    max?: number,
    size?: number,
    strokeWidth?: number
}

const CircularRating = ({ value, max = 10, size = 70, strokeWidth = 6 }: CircularType) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const safeValue = Math.min(Math.max(value, 0), max);

    const strokeDashoffset = circumference - (safeValue / max) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 z-100" width={size} height={size}>
                <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-gray-200/50 fill-none"
                strokeWidth={strokeWidth}
                />
                <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-[#21D07A] fill-none transition-all duration-300 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                />
            </svg>

            <div className="absolute flex items-center justify-center bg-[#081C22] rounded-full w-full h-full scale-115">
                <span className="text-2xl font-bold text-slate-100">{Math.ceil(safeValue / 0.1)}</span>
                <span className="relative -top-1 text-[9px] font-bold text-slate-100">%</span>
            </div>
        </div>
    );
}

export default CircularRating;