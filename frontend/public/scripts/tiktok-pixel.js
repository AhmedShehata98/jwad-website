const TIKTOK_PIXEL_ID = document.currentScript.getAttribute('data-pixel-id');
function initializeTiktokPixel() {
    window.TiktokAnalyticsObject = 'ttq';
    var ttq = (window.ttq = window.ttq || []);

    ttq.methods = [
        'page',
        'track',
        'identify',
        'instances',
        'debug',
        'on',
        'off',
        'once',
        'ready',
        'alias',
        'group',
        'enableCookie',
        'disableCookie',
        'holdConsent',
        'revokeConsent',
        'grantConsent',
    ];

    ttq.setAndDefer = function (obj, method) {
        obj[method] = function () {
            obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
        };
    };

    for (var i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
    }

    ttq.instance = function (instanceName) {
        var instance = ttq._i[instanceName] || [];
        for (var i = 0; i < ttq.methods.length; i++) {
            ttq.setAndDefer(instance, ttq.methods[i]);
        }
        return instance;
    };

    ttq.load = function (pixelId, options) {
        var scriptUrl = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        var partner = options && options.partner;

        ttq._i = ttq._i || {};
        ttq._i[pixelId] = [];
        ttq._i[pixelId]._u = scriptUrl;
        ttq._t = ttq._t || {};
        ttq._t[pixelId] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[pixelId] = options || {};

        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;
        scriptElement.src = scriptUrl + '?sdkid=' + pixelId + '&lib=ttq';

        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
    };

    ttq.load(TIKTOK_PIXEL_ID);
    ttq.page();
}

// Initialize the TikTok pixel
initializeTiktokPixel();
