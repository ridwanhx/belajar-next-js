export default function Custom404() {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2 p-9">
                <img src="/404/error-404.svg" alt="error-404-illustration" className="w-64" draggable="false" />
                <h3 className="text-3xl text-center text-pink-400">Sorry, the page is not found!</h3>
                <span className="d-block max-w-lg text-center text-sm text-slate-400">I know that feelings when you cannot get what you want, but maybe you can try this with fix the error first.</span>
            </div>
        </div>
    );
}