/**
 * Render component used for presenting actor on the screen.
 * @constructor
 * @class
 * @abstract
 * @extends ActorComponent
 */
function BaseRenderComponent()
{
    ActorComponent.apply(this);

    this.m_colour = new THREE.Color("rgb(255, 255, 0)");
}

BaseRenderComponent.prototype = Class.extend(ActorComponent,
{
    /**
     * Colour of the render component.
     * @type {THREE.Color}
     */
    m_colour: null,
    /**
     * Scene object used for presenting the render component.
     * @type {THREE.Object3D}
     */
    m_sceneObject: null,
    /**
     * Transform component.
     * @type {TransformComponent}
     */
    m_transformComponent: null,
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: notImplemented,
    /**
     * Gets the scene object.
     *
     * @returns {THREE.Object3D} Scene object.
     * @protected
     */
    _vGetSceneObject: function _vGetSceneObject()
    {
        if (!this.m_sceneObject)
        {
            this.m_sceneObject = this._vCreateSceneObject();
            this.m_sceneObject.matrixAutoUpdate = false;
        }

        return this.m_sceneObject;
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
        return Promise.resolve();
    },
    /**
     * Initializes the Actor Component.
     *
     * @param {{colour: string|number}} data Data of the component.
     * @returns {Promise} Promise of initialization of component.
     */
    vInitialise: function vInitialise(data)
    {
        if (data.colour)
        {
            this.m_colour = new THREE.Color(data.colour);
        }

        return this._vDelegateInitialise(data);
    },
    /**
     * Called when the component has been changed.
     */
    vOnChanged: function vOnChanged()
    {
        var eventData = new EventData_ModifiedRenderComponent(this.m_owner.m_id);
        this.m_owner.m_game.m_eventService.triggerEvent(eventData);
    },
    /**
     * Called when the component is requested to update.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        var position = this.m_transformComponent.m_position;
        var rotation = this.m_transformComponent.m_rotation;
        var scale = this.m_transformComponent.m_scale;

        var sceneObject = this.m_sceneObject;
        sceneObject.position.x = position.x;
        sceneObject.position.y = position.y;
        sceneObject.position.z = position.z;

        sceneObject.rotation.x = rotation.x;
        sceneObject.rotation.y = rotation.y;
        sceneObject.rotation.z = rotation.z;

        sceneObject.scale.x = scale.x;
        sceneObject.scale.y = scale.y;
        sceneObject.scale.z = scale.z;

        sceneObject.updateMatrix();
    },
    /**
     * Called after the initialization has been completed.
     */
    vPostInitialise: function vPostInitialise()
    {
        this.m_transformComponent = this.m_owner.getComponentByName("TransformComponent");

        var eventData = new EventData_NewRenderComponent(this.m_owner.m_id, this._vGetSceneObject());
        this.m_owner.m_game.m_eventService.triggerEvent(eventData);
    }
});