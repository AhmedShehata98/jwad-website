import React from 'react';

type InputsType = {
    id: number;
    placeholder: string;
    label: string;
    type: string;
};
type Props = {
    heading: string;
    inputsList: InputsType[];
    buttonLabel: string;
};
function ContactUsForm({ buttonLabel, heading, inputsList }: Props) {
    console.dir(inputsList, { depth: null });
    return (
        <div className="flex w-1/2 flex-col gap-3 bg-mainWhite p-12 shadow max-[770px]:p-6 max-md:w-full">
            <h4 className="mb-7 text-[32px] font-bold capitalize text-darkBlack">
                {heading}
            </h4>
            <div className="mb-10 flex w-full flex-wrap items-center justify-start gap-4">
                {inputsList?.map((input, idx) => {
                    if (input.type === 'textarea') {
                        // if (idx >= inputsList.length - 1) {
                        return (
                            <span
                                key={input.id}
                                className="flex w-full flex-col items-start justify-center gap-1"
                            >
                                <label
                                    htmlFor={input.label}
                                    className="text-base font-medium capitalize"
                                >
                                    {input.label}
                                </label>
                                <textarea
                                    id={input.label}
                                    name={input.label}
                                    placeholder={input.placeholder}
                                    className="h-32 w-full border border-transparent bg-[#F7F7F7] px-4 py-2 focus:border-[#181818] focus:outline-none"
                                    required
                                />
                            </span>
                        );
                    } else {
                        return (
                            <span
                                key={input.id}
                                className="flex w-full flex-col items-start justify-center gap-1 md:w-[calc(50%-1rem)]"
                            >
                                <label
                                    htmlFor={input.label}
                                    className="text-base font-medium capitalize"
                                >
                                    {input.label}
                                </label>
                                <input
                                    type={input.type}
                                    id={input.label}
                                    name={input.label}
                                    placeholder={input.placeholder}
                                    className="w-full border border-transparent bg-[#F7F7F7] px-4 py-2 focus:border-[#181818] focus:outline-none"
                                    required
                                />
                            </span>
                        );
                    }
                })}
            </div>
            <button
                type="submit"
                className="btn rounded-lg py-2 text-2xl font-semibold"
            >
                {buttonLabel}
            </button>
        </div>
    );
}

export default ContactUsForm;
