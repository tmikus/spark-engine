/**
 * Loader for Collada DAE mesh format.
 * @param {ResourceManager} resourceManager Instance of the resource manager to which this loader is added.
 * @class
 * @implements IResourceLoader
 */
function ColladaMeshLoader(resourceManager)
{
    this.m_cache = {};
    this.m_type = "Mesh/DAE";
    this.m_resourceManager = resourceManager;

    this.m_meshLoader = new THREE.ColladaLoader();
    this.m_meshLoader.options.convertUpAxis = true;
}

ColladaMeshLoader.prototype =
{
    /**
     * Cache for the DAE files.
     * @type {Object.<string, *>}
     */
    m_cache: null,
    /**
     * Loader used for loading DAE file.
     * @type {THREE.ColladaLoader}
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
     * @param {string} data Content of the Collada DAE file.
     * @private
     */
    _onResourceLoaded: function _onResourceLoaded(resourceName, data)
    {
        var processedData = null;

        try
        {
            var xmlParser = new DOMParser();
            processedData = xmlParser.parseFromString(data, "application/xml");
        }
        catch (ex)
        {
            SE_ERROR("Could not parse DAE resource: " + resourceName, ex);
            throw ex;
        }

        // Storing it in the cache.
        this.m_cache[resourceName] = processedData;
    },
    /**
     * Processes the resource.
     *
     * @param {string} resourceName Name of the resource.
     * @param {*} args Arguments to the loader.
     * @returns {Promise} Promise of loading the DAE mesh.
     * @private
     */
    _processMesh: function _processMesh(resourceName, args)
    {
        return new Promise(function (resolve, reject)
        {
            this.m_meshLoader.parse(this.m_cache[resourceName], function (collada)
            {
                var sceneMesh = collada.scene;

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
            return this._processMesh(resourceName, args);
        }

        return Http.get(resource.path, null, "text")
            .then(this._onResourceLoaded.bind(this, resourceName))
            .then(this._processMesh.bind(this, resourceName, args))
            ["catch"](function ()
            {
                SE_ERROR("Could not load Collada DAE resource: " + resourceName);
            });
    }
};