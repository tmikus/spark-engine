/**
 * Loader for PNG file format.
 * @param {ResourceManager} resourceManager Instance of the resource manager to which this loader is added.
 * @class
 * @implements IResourceLoader
 */
function PngLoader(resourceManager)
{
    this.m_cache = {};
    this.m_type = "Image/PNG";
    this.m_resourceManager = resourceManager;
}

PngLoader.prototype =
{
    /**
     * Cache for the PNG files.
     * @type {Object.<string, *>}
     */
    m_cache: null,
    /**
     * Type of the file loaded using this resource loader.
     * @type {string}
     */
    m_type: null,
    /**
     * Instance of the resource manager.
     * @type {ResourceManager}
     */
    m_resourceManager: null,
    /**
     * Loads resource old way for iOS 6.
     *
     * @param {string} resourceName Name of the resource.
     * @param {string} resourcePath Path to the resource.
     * @returns {Promise} Promise of loading resource.
     * @private
     */
    _loadResourceForIOs6: function _loadResourceForIOs6(resourceName, resourcePath)
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
                image.src = resourcePath;
            })
            .then(function (image)
            {
                var texture = new THREE.Texture(image);
                texture.needsUpdate = true;

                // Storing in the cache.
                this.m_cache[resourceName] = texture;

                return texture;
            }.bind(this));
    },
    /**
     * Called when the request to get resource has finished.
     * Parses the JSON and stores it in the cache.
     *
     * @param {string} resourceName Name of the loaded resource.
     * @param {string} data Content of the JSON file.
     * @returns {Promise} Promise of processing the image.
     * @private
     */
    _onResourceLoaded: function _onResourceLoaded(resourceName, data)
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

                // Storing in the cache.
                this.m_cache[resourceName] = texture;

                return texture;
            }.bind(this));
    },
    /**
     * Loads resource with specified resource descriptor.
     *
     * @param {string} resourceName Name of the resource to load.
     * @param {IResourceDescriptor} resource Descriptor of the resource.
     * @param {*} [args] Additional arguments to the loader.
     * @returns {Promise} Promise of loading resource.
     */
    vLoadResource: function vLoadResource(resourceName, resource, args)
    {
        if (this.m_cache[resourceName])
        {
            return Promise.resolve(this.m_cache[resourceName]);
        }

        var deviceInfo = DeviceInfo.get();
        if (deviceInfo.m_os.m_type == Os.iOs && deviceInfo.m_os.m_version.equals(6))
        {
            return this._loadResourceForIOs6(resourceName, resource.path);
        }

        return Http.get(resource.path, null, "blob")
            .then(this._onResourceLoaded.bind(this, resourceName))
            ["catch"](function ()
            {
                SE_ERROR("Could not load PNG resource: " + resourceName);
            });
    }
};