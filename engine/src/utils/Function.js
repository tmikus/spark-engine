/**
 * Creates a new function which will be executed once after a specified time passes.
 *
 * @param {Function} callback Callback to call after the time passes.
 * @param {number} time Time in milliseconds to wait until method should be called.
 * @returns {Function} Debounce function.
 */
Function.debounce = function Function_debounce(callback, time)
{
    var callArgs = null;
    var callTimeout = null;
    return function ()
    {
        callArgs = arguments;
        callTimeout && clearTimeout(callTimeout);

        callTimeout = setTimeout(function ()
        {
            callTimeout = null;
            callback.apply(this, callArgs);
        }, time);
    };
};