/**
 * Interface for a resource manager.
 * @param {SparkEngineWorker} gameWorker Instance of the game logic.
 * @constructor
 * @class
 * @implements IResourceManager
 */
function WorkerResourceManager(gameWorker)
{
    this.m_gameWorker = gameWorker;
    this.m_resourcePromises = {};
}

WorkerResourceManager.prototype =
{
    /**
     * Instance of the game logic to which this resource manager belongs.
     * @type {SparkEngineWorker}
     */
    m_gameWorker: null,
    /**
     * Array of promises of loading resources.
     * @type {Object.<string, {resolve: Function, reject: Function}[]>}
     */
    m_resourcePromises: null,
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
        return new Promise(function (resolve, reject)
        {
            if (!this.m_resourcePromises[name])
            {
                this.m_resourcePromises[name] = [{ resolve: resolve, reject: reject }]
            }
            else
            {
                this.m_resourcePromises[name].push({ resolve: resolve, reject: reject });
            }

            this.m_gameWorker.sendMessageToGame(new WorkerMessage_ResourceRequest(name));
        }.bind(this));
    },
    /**
     * Initialises the resource manager.
     *
     * @returns {Promise} Promise of the initialisation.
     */
    initialise: function initialise()
    {
        return new Promise(function (resolve)
        {
            resolve();
        });
    },
    /**
     * Called when the requested resource has been loaded.
     *
     * @param {WorkerMessage_ResourceResponse} message Message returned from the worker.
     */
    requestedResourceLoaded: function requestedResourceLoaded(message)
    {
        var promises = this.m_resourcePromises[message.m_resourceName];
        if (!promises || !promises.length)
        {
            SE_WARNING("Resource loaded but no one requested it: " + message.m_resourceName);
            return;
        }

        for (var promiseIndex = 0; promiseIndex < promises.length; promiseIndex++)
        {
            promises[promiseIndex].resolve(message.m_data);
        }

        delete this.m_resourcePromises[message.m_resourceName];
    }
};