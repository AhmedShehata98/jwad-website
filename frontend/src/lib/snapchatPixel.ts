type WindowType = Window &
    typeof globalThis & {
        snaptr: Function;
    };

// Track a custom event
export function trackCustomEvent({
    eventName,
    eventProperties,
}: {
    eventName: string;
    eventProperties?: object;
}) {
    (window as WindowType).snaptr('track', eventName, eventProperties);
}
