/**
 * Interface for the resource loader.
 * Every resource loader must implement this interface.
 * @param {ResourceManager} resourceManager Instance of the resource manager to which this loader is added.
 * @interface
 */
function IResourceLoader(resourceManager)
{
}

IResourceLoader.prototype =
{
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
     * Loads resource with specified resource descriptor.
     *
     * @param {string} resourceName Name of the resource to load.
     * @param {IResourceDescriptor} resource Descriptor of the resource.
     * @param {*} [args] Additional arguments to the loader.
     * @returns {Promise} Promise of loading resource.
     */
    vLoadResource: notImplemented
};