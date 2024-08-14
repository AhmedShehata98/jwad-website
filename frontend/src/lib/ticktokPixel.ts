type WindowType = Window &
    typeof globalThis & {
        snaptr: Function;
        ttq: any;
    };
export const trackEvent = (event: string, options?: object) => {
    (window as WindowType).ttq.track(event, options);
};
