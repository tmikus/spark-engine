/**
 * Render component used for presenting actor on the screen as a mesh
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function MeshRenderComponent()
{
    BaseRenderComponent.apply(this);
}

MeshRenderComponent.s_name = "MeshRenderComponent";

MeshRenderComponent.prototype = Class.extend(BaseRenderComponent,
{
    /**
     * Mesh loader from the JSON file.
     * @type {THREE.JSONLoader}
     */
    m_jsonMeshLoader: null,
    /**
     * Mesh created by this component.
     * @type {THREE.Mesh}
     */
    m_mesh: null,
    /**
     * Name of the mesh to load.
     * @type {string}
     */
    m_meshName: null,
    /**
     * Path to the mesh textures directory.
     * @type {string}
     */
    m_meshTexturesPath: null,
    /**
     * Called after the mesh resource has been loaded.
     *
     * @param {THREE.Mesh} mesh Mesh resource object.
     * @private
     */
    _onMeshResourceLoaded: function _onMeshResourceLoaded(mesh)
    {
        this.m_mesh = mesh;
    },
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: function _vCreateSceneObject()
    {
        return this.m_mesh;
    },
    /**
     * Delegates the initialization to the child class.
     *
     * @param {*} data Data of the component.
     * @returns {Promise} Promise of initialization of component.
     * @protected
     */
    _vDelegateInitialise: function _vDelegateInitialise(data)
    {
        this.m_jsonMeshLoader = new THREE.JSONLoader();

        if (data.meshName)
        {
            this.m_meshName = data.meshName;
        }

        if (data.meshTexturesPath)
        {
            this.m_meshTexturesPath = data.meshTexturesPath;
        }

        return this.m_owner.m_game.m_resourceManager.getResource(this.m_meshName, { texturesPath: this.m_meshTexturesPath })
            .then(this._onMeshResourceLoaded.bind(this))
            .catch(function ()
            {
                SE_ERROR("Could not load mesh resource.");
            });
    },
    /**
     * Gets the name of the component.
     *
     * @returns {string} Name of the component.
     */
    vGetName: function vGetName()
    {
        return MeshRenderComponent.s_name;
    }
});