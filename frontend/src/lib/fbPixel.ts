type WindowType = Window &
    typeof globalThis & {
        fbq: Function;
    };
export const event = ({
    name,
    options,
}: {
    name: string;
    options?: object;
}) => {
    (window as WindowType).fbq('track', name, options);
};

export const pageview = () => {
    (window as WindowType).fbq('track', 'PageView');
};
