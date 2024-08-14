const SNAPCHAT_PIXEL_ID = document.currentScript.getAttribute('data-pixel-id');
const SNAPCHAT_USER_EMAIL =
    document.currentScript.getAttribute('data-user-email');

// Snap Pixel Code

if (!window.snaptr) {
    window.snaptr = function () {
        if (window.snaptr.handleRequest) {
            window.snaptr.handleRequest.apply(window.snaptr, arguments);
        } else {
            window.snaptr.queue.push(arguments);
        }
    };

    window.snaptr.queue = [];

    var scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = 'https://sc-static.net/scevent.min.js';

    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(scriptElement, firstScript);
}

window.snaptr('init', SNAPCHAT_PIXEL_ID, {
    user_email: SNAPCHAT_USER_EMAIL,
});

window.snaptr('track', 'PAGE_VIEW');

// End Snap Pixel Code
