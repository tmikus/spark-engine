var Http =
{
    /**
     * Makes the request to the specified URL.
     *
     * @param {HttpRequestOptions} options Request options.
     * @returns {boolean} True if request has been created; otherwise false.
     * @private
     */
    _doRequest: function _doRequest(options)
    {
        // Verify the URL
        if (!options.url)
        {
            SE_ERROR("Trying to make request to empty URL!");
            return false;
        }

        // Verify the request type
        if (!options.type)
        {
            SE_ERROR("Trying to make request without method!");
            return false;
        }

        // Initialize the request.
        var request = new XMLHttpRequest();

        // Bind onAbort event listener.
        if (options.onAbort)
        {
            request.onabort = options.onAbort;
        }

        // Bind onError event listener.
        if (options.onError)
        {
            request.onerror = options.onError;
        }

        // Bind onLoad event listener.
        if (options.onLoad)
        {
            request.onload = options.onLoad;
        }

        // Bind onProgress event listener.
        if (options.onProgress)
        {
            request.onprogress = options.onProgress;
        }

        // Bind onTimeout event listener.
        if (options.onTimeout)
        {
            request.ontimeout = options.onTimeout;
        }

        // Opening the request.
        request.open(options.type, options.url, true);

        // Set the response type
        if (options.responseType)
        {
            request.responseType = options.responseType;
        }

        // Setting the timeout.
        request.timeout = options.timeout;

        // Sending the request.
        request.send();

        return true;
    },
    /**
     * Performs the GET request to the specified URL.
     *
     * @param {string} url URL of the request.
     * @param {*} [params] Params of the request.
     * @param {string} [responseType] Expected type of the response.
     * @returns {Promise} Promise of the GET request.
     */
    get: function get(url, params, responseType)
    {
        return new Promise(function (resolve, reject)
        {
            // Start making the request.
            var result = this._doRequest(new HttpRequestOptions(
                {
                    onError: function ()
                    {
                        SE_ERROR("Could not load the resource: " + url);
                        reject(this);
                    },
                    onLoad: function ()
                    {
                        switch (this.status)
                        {
                            case 200:
                            case 201:
                                resolve(this.response == null ? this.responseText : this.response);
                                break;
                            default:
                                SE_ERROR("Could not load the resource: " + url);
                                reject(this);
                        }
                    },
                    params: params,
                    responseType: responseType,
                    type: "GET",
                    url: url
                }));

            // If starting of the request has failed - fail the promise.
            if (!result)
            {
                reject();
            }
        }.bind(this));
    }
};