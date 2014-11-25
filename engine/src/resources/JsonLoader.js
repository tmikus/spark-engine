/**
 * Loader for JSON file format.
 * @param {ResourceManager} resourceManager Instance of the resource manager to which this loader is added.
 * @class
 * @implements IResourceLoader
 */
function JsonLoader(resourceManager)
{
    this.m_cache = {};
    this.m_type = "Text/JSON";
    this.m_resourceManager = resourceManager;
}

JsonLoader.prototype =
{
    /**
     * Cache for the JSON files.
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
     * Parses the JSON and stores it in the cache.
     *
     * @param {string} resourceName Name of the loaded resource.
     * @param {string} data Content of the JSON file.
     * @returns {*} JSON object.
     * @private
     */
    _onResourceLoaded: function _onResourceLoaded(resourceName, data)
    {
        // Trying to parse JSON data.
        var parsedData;
        try
        {
            parsedData = JSON.parse(data);
        }
        catch (ex)
        {
            SE_ERROR("Could not parse JSON resource: " + resourceName, ex);
            throw ex;
        }

        // Storing it in the cache.
        this.m_cache[resourceName] = parsedData;

        // Returning the parsed json
        return parsedData;
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
                SE_ERROR("Could not load JSON resource: " + resourceName);
            });
    }
};