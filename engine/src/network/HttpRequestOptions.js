/**
 * Options for the HTTP request.
 *
 * @param {*} options Options to set to the request.
 * @constructor
 * @class
 * @extends BaseOptions
 */
function HttpRequestOptions(options)
{
    BaseOptions.apply(this, arguments);
}

HttpRequestOptions.prototype = Class.extend(BaseOptions,
{
    /**
     * Called when the request became aborted.
     * @type {Function}
     */
    onAbort: null,
    /**
     * Called when the request reports error.
     * @type {Function}
     */
    onError: null,
    /**
     * Called when the request has been loaded.
     * @type {Function}
     */
    onLoad: null,
    /**
     * Called whenever request reports progress.
     * @type {Function}
     */
    onProgress: null,
    /**
     * Called when the request has timed out.
     * @type {Function}
     */
    onTimeout: null,
    /**
     * Parameters of the request.
     * @type {*}
     */
    params: null,
    /**
     * Expected type of the response.
     * See: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest
     * @type {string}
     */
    responseType: "",
    /**
     * Timeout of the request.
     * Default 15 sec.
     * @type {number}
     */
    timeout: 15000,
    /**
     * Type of the request. Default GET
     * @type {string}
     */
    type: "GET",
    /**
     * URL of the request.
     * @type {string}
     */
    url: null
});