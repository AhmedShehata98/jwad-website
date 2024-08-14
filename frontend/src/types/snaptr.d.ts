type SnaptrParams = Record<string, any>;

type SnaptrFunction = {
    (command: 'init', pixelId: string, params?: SnaptrParams): void;
    (command: 'track', eventName: string, params?: SnaptrParams): void;
    (command: string, ...args: any[]): void;
    queue: Array<IArguments>;
    handleRequest?: (...args: any[]) => void;
};

// Declare the snaptr function globally
declare global {
    interface Window {
        snaptr: SnaptrFunction;
    }
}
