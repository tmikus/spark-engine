/**
 * Initialises the resource manager with specified resource index file URL.
 *
 * @param {string} resourceIndexUrl URL to the resource index file.
 * @constructor
 * @class
 * @implements IResourceManager
 */
function ResourceManager(game, resourceIndexUrl)
{
    this.m_game = game;
    this.m_resourceCache = {};
    this.m_resourcesMap = {};
    this.m_resourceIndexUrl = resourceIndexUrl;
}

ResourceManager.prototype =
{
    /**
     * Instance of the game to which this resource manager belongs.
     * @type {SparkEngineApp}
     */
    m_game: null,
    /**
     * Cache object of the resources.
     * @type {*}
     */
    m_resourceCache: null,
    /**
     * Resources map - maps the name and its path.
     * @type {*}
     */
    m_resourcesMap: null,
    /**
     * URL of the resources index file.
     * @type {string}
     */
    m_resourceIndexUrl: null,
    /**
     * Called when the requested resource has been loaded.
     *
     * @param {string} resourceName Name of the requested resource.
     * @param {*} data Data of the resource.
     * @private
     */
    _onRequestedResourceLoaded: function _onRequestedResourceLoaded(resourceName, data)
    {
        this.m_game.sendMessageToGameLogic(new WorkerMessage_ResourceResponse(resourceName, data));
    },
    /**
     * Called when the descriptor of the resources has been loaded.
     *
     * @param data Data loaded from the server.
     * @private
     */
    _onResourcesDescriptorLoaded: function _onResourcesDescriptorLoaded(data)
    {
        this.m_resourcesMap = JSON.parse(data);
    },
    /**
     * Does the pre-processing of the image.
     *
     * @param data Data loaded from the server.
     * @returns {Promise} Promise for processing of the image.
     * @private
     */
    _preProcessImage: function _preProcessImage(data)
    {
        return new Promise(function (resolve, reject)
            {
                var image = new Image();
                image.onerror = function ()
                {
                    reject();
                };
                image.onload = function ()
                {
                    resolve(image);
                };
                image.src = (window.URL || window.webkitURL).createObjectURL(data);
            })
            .then(function (image)
            {
                var texture = new THREE.Texture(image);
                texture.needsUpdate = true;
                return texture;
            });
    },
    /**
     * Pre-processes the resource before passing it into the object waiting for it.
     *
     * @param {string} name Name of the resource.
     * @param {*} resourceDescriptor Descriptor of the resource,
     * @param data Data loaded from the server.
     * @returns {Promise|*} Pre-processed data.
     * @private
     */
    _preProcessResource: function _preProcessResource(name, resourceDescriptor, data)
    {
        var preProcessedData;

        // Try pre-processing the resource
        switch (resourceDescriptor.type)
        {
            // In case there is any processing required - do it here
            case "Image/JPEG":
            case "Image/PNG":
                preProcessedData = this._preProcessImage(data);
                break;
            case "JSON":
                if (typeof data == "string")
                {
                    preProcessedData = JSON.parse(data);
                }
                else
                {
                    preProcessedData = data;
                }
                break;
            case "Text/JavaScript":
                preProcessedData = (window.URL || window.webkitURL).createObjectURL(data);
                break;
            default:
                preProcessedData = data;
                break;
        }

        // Return the data
        return preProcessedData;
    },
    /**
     * Stores the resource in resource cache.
     * This speeds up the running time of the application
     * because it doesn't have to do XHR requests and pre-process data.
     *
     * @param {string} name Name of the loaded resource.
     * @param {*} resourceDescriptor Descriptor of the resource.
     * @param {*} data Data loaded from the server (and pre-processed).
     * @returns {*} The same 'data'.
     * @private
     */
    _storeResourceInCache: function _storeResourceInCache(name, resourceDescriptor, data)
    {
        // Store the resource in the cache.
        if (resourceDescriptor.cache === undefined || resourceDescriptor.cache)
        {
            this.m_resourceCache[name] = data;
        }

        return data;
    },
    /**
     * Gets the resource with specified name.
     * First it checks if the resource is in the cache.
     * If is not - then it makes a request to get it.
     *
     * @param {string} name Name of the resource to load.
     * @returns {Promise} Get resource promise.
     */
    getResource: function getResource(name)
    {
        // Try to find the resource from cache.
        var resource = this.m_resourceCache[name];

        // If the resource was not found
        if (resource === undefined)
        {
            // Try to find the descriptor of resource.
            var resourceDescriptor = this.m_resourcesMap[name];
            if (!resourceDescriptor)
            {
                SE_ERROR("Could not find resource with that name: " + name);
                return new Promise(function (resolve, reject) { reject(); });
            }

            // Find the response type (if suitable)
            var responseType = null;
            switch (resourceDescriptor.type)
            {
                case "Audio/AAC":
                case "Audio/MP4":
                case "Audio/OGG":
                    responseType = "arraybuffer";
                    break;
                case "HTML":
                    responseType = "text";
                    break;
                case "Image/JPEG":
                case "Image/PNG":
                    responseType = "blob";
                    break;
                case "JSON":
                    responseType = "json";
                    break;
                case "Text/JavaScript":
                    responseType = "blob";
                    break;
            }

            // Try to get the resource from the URL.
            return Http.get(resourceDescriptor.path, null, responseType)
                .then(this._preProcessResource.bind(this, name, resourceDescriptor))
                .then(this._storeResourceInCache.bind(this, name, resourceDescriptor))
                ["catch"](function ()
                {
                    SE_ERROR("Could not process resource: ", name);
                })
        }

        // Return the promise just to satisfy the interface requirements.
        return new Promise(function (resolve)
        {
            resolve(resource)
        });
    },
    /**
     * Called when the worker requested a resource to be loaded.
     *
     * @param {WorkerMessage_ResourceRequest} request Request of getting a resource.
     */
    resourceRequested: function resourceRequested(request)
    {
        this.getResource(request.m_resourceName)
            .then(this._onRequestedResourceLoaded.bind(this, request.m_resourceName))
            ["catch"](function ()
            {
                SE_ERROR("Could not get resource requested by game logic: " + request.m_resourceName);
            });
    },
    /**
     * Initialises the resource manager.
     *
     * @returns {Promise} Promise of the initialisation.
     */
    initialise: function initialise()
    {
        return Http.get(this.m_resourceIndexUrl).then(this._onResourcesDescriptorLoaded.bind(this));
    }
};