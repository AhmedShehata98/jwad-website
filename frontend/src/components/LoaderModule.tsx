function LoaderModule() {
    return (
        <div className="fixed inset-0 z-50 flex size-full items-center justify-center bg-mainWhite bg-opacity-70">
            <div className="flex size-72 flex-col items-center justify-center gap-6 rounded-md bg-gray-100 px-8 py-4 shadow max-lg:size-1/2 max-md:size-[60%] max-sm:size-[90%]">
                <span className="loader inline-block"></span>
                <p className="mt-3 text-base font-medium text-slate-500">
                    يتم الانتهاء من بعض الاشياء
                </p>
                <h5 className="text-xl font-semibold capitalize text-slate-800">
                    لحظة واحدة ...
                </h5>
            </div>
        </div>
    );
}

export default LoaderModule;
