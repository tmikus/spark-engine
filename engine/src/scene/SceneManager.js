/**
 * Class responsible for managing scene and synchronising it with THREE.Scene object.
 *
 * @param {Renderer} renderer Renderer used to render scene.
 * @param {THREE.Scene} scene Scene used by the renderer.
 * @constructor
 * @class
 */
function SceneManager(renderer, scene)
{
    this.m_actorsMap = {};
    this.m_actorLightsMap = {};
    this.m_actorSceneObjectsMap = {};
    this.m_renderer = renderer;
    this.m_scene = scene;
    this.m_sceneNodes = [];
    this.m_sceneNodesMap = {};

    this.m_bindings =
    {
        onCreateActor: this._onCreateActor.bind(this),
        onDestroyActor: this._onDestroyActor.bind(this),
        onModifiedLightComponent: this._onModifiedLightComponent.bind(this),
        onModifiedRenderComponent: this._onModifiedRenderComponent.bind(this),
        onNewLightComponent: this._onNewLightComponent.bind(this),
        onNewRenderComponent: this._onNewRenderComponent.bind(this)
    };
}

SceneManager.prototype =
{
    /**
     * Map of actor ID and actor scene object.
     * @type {Object.<number, THREE.Object3D>}
     */
    m_actorsMap: null,
    /**
     * Map of actor ID and light scene node.
     * @type {Object.<number, THREE.Object3D>}
     */
    m_actorLightsMap: null,
    /**
     * Map of actor ID and scene node.
     * @type {Object.<number, THREE.Object3D>}
     */
    m_actorSceneObjectsMap: null,
    /**
     * Map of bindings for specific methods of the class.
     * @type {*}
     */
    m_bindings: null,
    /**
     * Renderer used to render scene.
     * @type {Renderer}
     */
    m_renderer: null,
    /**
     * Scene used by the renderer.
     * @type {THREE.Scene}
     */
    m_scene: null,
    /**
     * List of scene nodes.
     * @type {SceneNode[]}
     */
    m_sceneNodes: null,
    /**
     * Map of scene nodes and actor IDs.
     * @type {Object.<number, SceneNode>}
     */
    m_sceneNodesMap: null,
    /**
     * Called when the game informed about actor being created.
     *
     * @param {EventData_CreateActor} data Event data.
     * @private
     */
    _onCreateActor: function _onCreateActor(data)
    {
        var actorSceneObject = this.m_actorsMap[data.m_actorId];
        if (!actorSceneObject)
        {
            actorSceneObject = new THREE.Object3D();
            this.m_actorsMap[data.m_actorId] = actorSceneObject;
        }

        (data.m_parentActorId ? this.m_actorsMap[data.m_parentActorId] : this.m_scene).add(actorSceneObject);

        var actorNode = new SceneNode(this.m_renderer.m_game.m_gameLogic.vGetActor(data.m_actorId), actorSceneObject);
        this.m_sceneNodes.push(actorNode);
        this.m_sceneNodesMap[data.m_actorId] = actorNode;
    },
    /**
     * Called when the game engine told the scene manager to delete actor.
     * Tries to remove render components of the actor.
     *
     * @param {EventData_DestroyActor} data Event data.
     * @private
     */
    _onDestroyActor: function _onDestroyActor(data)
    {
        var actorObject = this.m_actorsMap[data.m_actorId];
        if (actorObject)
        {
            var sceneObject = this.m_actorSceneObjectsMap[data.m_actorId];
            if (sceneObject)
            {
                SE_INFO("Destroying actor's scene object.");
                actorObject.remove(sceneObject.m_sceneObject);
                delete this.m_actorSceneObjectsMap[data.m_actorId];
            }

            var lightObject = this.m_actorLightsMap[data.m_actorId];
            if (lightObject)
            {
                SE_INFO("Destroying actor's light object.");
                actorObject.remove(lightObject.m_sceneObject);
                delete this.m_actorLightsMap[data.m_actorId];
            }

            SE_INFO("Destroying actor root object.");
            actorObject.parent.remove(actorObject);
            delete this.m_actorsMap[data.m_actorId];

            var actorNode = this.m_sceneNodesMap[data.m_actorId];
            this.m_sceneNodes.splice(this.m_sceneNodes.indexOf(actorNode), 1);
            delete this.m_sceneNodesMap[data.m_actorId];
        }
    },
    /**
     * Called when the light component of the actor has changed.
     * Modifies the component part.
     *
     * @param {EventData_ModifiedLightComponent} data Event data.
     * @private
     */
    _onModifiedLightComponent: function _onModifiedLightComponent(data)
    {
        SE_INFO("Modifying actor's scene objects.");
    },
    /**
     * Called when the render component of the actor has changed.
     * Modifies the component part.
     *
     * @param {EventData_ModifiedRenderComponent} data Event data.
     * @private
     */
    _onModifiedRenderComponent: function _onModifiedRenderComponent(data)
    {
        SE_INFO("Modifying actor's scene objects.");
    },
    /**
     * Called when the new light component was created.
     * Adds the component to the scene.
     *
     * @param {EventData_NewLightComponent} data Event data.
     * @private
     */
    _onNewLightComponent: function _onNewLightComponent(data)
    {
        SE_INFO("Creating actor's scene objects.");

        var sceneNode = data.m_sceneNode;
        var actor = this.m_actorsMap[data.m_actorId];

        if (!actor)
        {
            actor = new THREE.Object3D();
            this.m_actorsMap[data.m_actorId] = actor;
        }

        actor.add(sceneNode);

        this.m_actorLightsMap[data.m_actorId] = sceneNode;
    },
    /**
     * Called when the new render component was created.
     * Adds the component to the scene.
     *
     * @param {EventData_NewRenderComponent} data Event data.
     * @private
     */
    _onNewRenderComponent: function _onNewRenderComponent(data)
    {
        SE_INFO("Creating actor's scene objects.");
        var sceneNode = data.m_sceneNode;
        var actor = this.m_actorsMap[data.m_actorId];

        if (!actor)
        {
            actor = new THREE.Object3D();
            this.m_actorsMap[data.m_actorId] = actor;
        }

        actor.add(sceneNode);

        this.m_actorSceneObjectsMap[data.m_actorId] = sceneNode;
    },
    /**
     * Destroys the scene manager.
     */
    destroy: function destroy()
    {
        var eventService = this.m_renderer.m_game.m_eventService;

        eventService.removeEventListener(EventData_CreateActor.s_type, this.m_bindings.onCreateActor);
        eventService.removeEventListener(EventData_DestroyActor.s_type, this.m_bindings.onDestroyActor);
        eventService.removeEventListener(EventData_ModifiedLightComponent.s_type, this.m_bindings.onModifiedLightComponent);
        eventService.removeEventListener(EventData_ModifiedRenderComponent.s_type, this.m_bindings.onModifiedRenderComponent);
        eventService.removeEventListener(EventData_NewLightComponent.s_type, this.m_bindings.onNewLightComponent);
        eventService.removeEventListener(EventData_NewRenderComponent.s_type, this.m_bindings.onNewRenderComponent);
    },
    /**
     * Initialises the scene manager.
     *
     * @returns {Promise} promise of initialisation.
     */
    initialise: function initialise()
    {
        var eventService = this.m_renderer.m_game.m_eventService;

        eventService.addEventListener(EventData_CreateActor.s_type, this.m_bindings.onCreateActor);
        eventService.addEventListener(EventData_DestroyActor.s_type, this.m_bindings.onDestroyActor);
        eventService.addEventListener(EventData_ModifiedLightComponent.s_type, this.m_bindings.onModifiedLightComponent);
        eventService.addEventListener(EventData_ModifiedRenderComponent.s_type, this.m_bindings.onModifiedRenderComponent);
        eventService.addEventListener(EventData_NewLightComponent.s_type, this.m_bindings.onNewLightComponent);
        eventService.addEventListener(EventData_NewRenderComponent.s_type, this.m_bindings.onNewRenderComponent);

        return Promise.resolve();
    },
    /**
     * Called after rendering the scene node.
     */
    onPostRender: function onPostRender()
    {
        var sceneNodes = this.m_sceneNodes;
        var sceneNodesLength = sceneNodes.length;

        for (var sceneNodeIndex = 0; sceneNodeIndex < sceneNodesLength; sceneNodeIndex++)
        {
            sceneNodes[sceneNodeIndex].onPostRender();
        }
    },
    /**
     * Called before rendering the scene node.
     */
    onPreRender: function onPreRender()
    {
        var sceneNodes = this.m_sceneNodes;
        var sceneNodesLength = sceneNodes.length;

        for (var sceneNodeIndex = 0; sceneNodeIndex < sceneNodesLength; sceneNodeIndex++)
        {
            sceneNodes[sceneNodeIndex].onPreRender();
        }
    }
};