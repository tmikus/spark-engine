/**
 * Loader for JS file format.
 * @param {ResourceManager} resourceManager Instance of the resource manager to which this loader is added.
 * @class
 * @implements IResourceLoader
 */
function JavaScriptLoader(resourceManager)
{
    this.m_cache = {};
    this.m_type = "Text/JavaScript";
    this.m_resourceManager = resourceManager;
}

JavaScriptLoader.prototype =
{
    /**
     * Cache for the JS files.
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
     * Called when the request to get resource has finished.
     *
     * @param {string} resourceName Name of the loaded resource.
     * @param {string} data Content of the JS file.
     * @returns {string} JS file content..
     * @private
     */
    _onResourceLoaded: function _onResourceLoaded(resourceName, data)
    {
        // Storing it in the cache.
        this.m_cache[resourceName] = data;

        // Returning the js
        return data;
    },
    /**
     * Loads resource with specified resource descriptor.
     *
     * @param {string} resourceName Name of the resource to load.
     * @param {IResourceDescriptor} resource Descriptor of the resource.
     * @returns {Promise} Promise of loading resource.
     */
    vLoadResource: function vLoadResource(resourceName, resource)
    {
        if (this.m_cache[resourceName])
        {
            return Promise.resolve(this.m_cache[resourceName]);
        }

        return Http.get(resource.path, null, "text")
            .then(this._onResourceLoaded.bind(this, resourceName))
            ["catch"](function ()
            {
                SE_ERROR("Could not load JS resource: " + resourceName);
            });
    }
};