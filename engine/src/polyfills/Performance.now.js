window.performance = window.performance || {};
performance.now = (function() {
    return performance.now
        || performance.mozNow
        || performance.msNow
        || performance.oNow
        || performance.webkitNow
        || Date.now.bind(Date);
})();