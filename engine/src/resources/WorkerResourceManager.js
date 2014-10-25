/**
 * Interface for a resource manager.
 * @constructor
 * @class
 * @implements IResourceManager
 */
function WorkerResourceManager()
{
}

WorkerResourceManager.prototype =
{
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
    }
};