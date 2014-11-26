/**
 * Initialises the resource manager with specified resource index file URL.
 *
 * @param {SparkEngineApp} game Instance of the game using this resource manager.
 * @param {string} resourceIndexUrl URL to the resource index file.
 * @constructor
 * @class
 * @implements IResourceManager
 */
function ResourceManager(game, resourceIndexUrl)
{
    this.m_game = game;
    this.m_resourceLoaders = {};
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
     * Map of resource loaders and types for the files.
     * @type {Object.<string, IResourceLoader>}
     */
    m_resourceLoaders: null,
    /**
     * Resources map - maps the name and its path.
     * @type {Object.<string, IResourceDescriptor>}
     */
    m_resourcesMap: null,
    /**
     * URL of the resources index file.
     * @type {string}
     */
    m_resourceIndexUrl: null,
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
     * Gets the resource with specified name.
     * First it checks if the resource is in the cache.
     * If is not - then it makes a request to get it.
     *
     * @param {string} name Name of the resource to load.
     * @param {*} [loaderArgs] Additional arguments to the loader.
     * @returns {Promise} Get resource promise.
     */
    getResource: function getResource(name, loaderArgs)
    {
        // Try to find the descriptor of resource.
        var resourceDescriptor = this.m_resourcesMap[name];
        if (!resourceDescriptor)
        {
            SE_ERROR("Could not find resource with that name: " + name);
            return Promise.reject();
        }

        // Try to find resource loader.
        var resourceLoader = this.m_resourceLoaders[resourceDescriptor.type];
        if (!resourceLoader)
        {
            SE_ERROR("Could not load resource with type: " + resourceDescriptor.type + ". No loader found for that type.");
            return Promise.reject();
        }

        return resourceLoader.vLoadResource(name, resourceDescriptor, loaderArgs);
    },
    /**
     * Initialises the resource manager.
     *
     * @returns {Promise} Promise of the initialisation.
     */
    initialise: function initialise()
    {
        return Http.get(this.m_resourceIndexUrl).then(this._onResourcesDescriptorLoaded.bind(this));
    },
    /**
     * Registers the resource loader.
     *
     * @param {function(new:IResourceLoader, IResourceManager)} loaderClass Resource loader class to register.
     * @returns {boolean} True if registered successfully; otherwise false.
     */
    registerLoader: function registerLoader(loaderClass)
    {
        var loader = new loaderClass(this);

        if (this.m_resourceLoaders[loader.m_type])
        {
            SE_WARNING("Trying to register resource loader twice with the same type: " + loader.m_type);
            return false;
        }

        this.m_resourceLoaders[loader.m_type] = loader;
        return true;
    }
};