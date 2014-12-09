/**
 * Loader for JSON mesh format.
 * @param {ResourceManager} resourceManager Instance of the resource manager to which this loader is added.
 * @class
 * @implements IResourceLoader
 */
function JsonMeshLoader(resourceManager)
{
    this.m_cache = {};
    this.m_type = "Mesh/JSON";
    this.m_resourceManager = resourceManager;

    this.m_meshLoader = new THREE.SceneLoader();
}

JsonMeshLoader.prototype =
{
    /**
     * Cache for the JSON files.
     * @type {Object.<string, *>}
     */
    m_cache: null,
    /**
     * Loader used for loading JSON file.
     * @type {THREE.SceneLoader}
     */
    m_meshLoader: null,
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
     * @param {string} data Content of the JSON file.
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
    },
    /**
     * Processes the resource.
     *
     * @param {string} resourceName Name of the resource.
     * @param {*} args Arguments to the loader.
     * @returns {Promise} Promise of loading the JSON mesh.
     * @private
     */
    _processMesh: function _processMesh(resourceName, args)
    {
        try
        {
            return new Promise(function (resolve, reject)
            {
                this.m_meshLoader.parse(this.m_cache[resourceName], function (fbx)
                {
                    var sceneMesh = fbx.scene;

                    sceneMesh.traverse(function (child)
                    {
                        if (child instanceof THREE.Mesh)
                        {
                            child.geometry.computeFaceNormals();
                            child.material.shading = THREE.FlatShading;
                        }
                    });

                    sceneMesh.updateMatrix();

                    resolve(sceneMesh);
                }, args.texturesPath);
            }.bind(this));
        }
        catch (ex)
        {
            SE_ERROR("Could not process mesh '" + resourceName + "'.", ex);
            throw ex;
        }
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
            return Promise.resolve(this._processMesh(resourceName, args));
        }

        return Http.get(resource.path, null, "text")
            .then(this._onResourceLoaded.bind(this, resourceName))
            .then(this._processMesh.bind(this, resourceName, args))
            ["catch"](function ()
            {
                SE_ERROR("Could not load JSON resource: " + resourceName);
            });
    }
};