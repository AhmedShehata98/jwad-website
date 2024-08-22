import React from 'react';

type Props = {
    heading: string;
    chipText: string;
    description: string;
};
function Header({ chipText, description, heading }: Props) {
    return (
        <div className="app-container my-8 flex flex-col gap-3 border-b-2 border-neutral-600 pb-10">
            <div className="flex flex-col gap-8">
                <span className="flex w-fit items-center justify-center rounded-full border-2 border-neutral-800 p-3 text-sm font-semibold leading-3 text-neutral-800">
                    {chipText}
                </span>
                <h2 className="text-3xl font-bold capitalize text-neutral-800">
                    {heading}
                </h2>
                <p className="text-sm text-neutral-600">{description}</p>
            </div>
        </div>
    );
}

export default Header;
