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
    this.m_actorMap = {};
    this.m_renderer = renderer;
    this.m_scene = scene;

    this.m_bindings =
    {
        onDestroyActor: this._onDestroyActor.bind(this),
        onModifiedRenderComponent: this._onModifiedRenderComponent.bind(this),
        onNewRenderComponent: this._onNewRenderComponent.bind(this)
    };
}

SceneManager.prototype =
{
    /**
     * Map of actor ID and scene object.
     * @type {Object.<number, THREE.Object3D>}
     */
    m_actorMap: null,
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
     * Called when the game engine told the scene manager to delete actor.
     * Tries to remove render components of the actor.
     *
     * @param {EventData_DestroyActor} data Event data.
     * @private
     */
    _onDestroyActor: function _onDestroyActor(data)
    {
        SE_INFO("Destroying actor's scene objects.");
        var sceneObject = this.m_actorMap[data.m_actorId];
        this.m_scene.remove(sceneObject);
        delete this.m_actorMap[data.m_actorId];
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
     * Called when the new render component was created.
     * Adds the component to the scene.
     *
     * @param {EventData_NewRenderComponent} data Event data.
     * @private
     */
    _onNewRenderComponent: function _onNewRenderComponent(data)
    {
        SE_INFO("Creating actor's scene objects.");
        this.m_actorMap[data.m_actorId] = data.m_sceneObject;
        this.m_scene.add(data.m_sceneObject);
    },
    /**
     * Destroys the scene manager.
     */
    destroy: function destroy()
    {
        var eventService = this.m_renderer.m_game.m_eventService;

        eventService.removeEventListener(EventData_DestroyActor.s_type, this.m_bindings.onDestroyActor);
        eventService.removeEventListener(EventData_ModifiedRenderComponent.s_type, this.m_bindings.onModifiedRenderComponent);
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

        eventService.addEventListener(EventData_DestroyActor.s_type, this.m_bindings.onDestroyActor);
        eventService.addEventListener(EventData_ModifiedRenderComponent.s_type, this.m_bindings.onModifiedRenderComponent);
        eventService.addEventListener(EventData_NewRenderComponent.s_type, this.m_bindings.onNewRenderComponent);

        return Promise.resolve();
    }
};