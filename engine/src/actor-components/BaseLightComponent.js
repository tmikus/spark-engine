/**
 * Light component used for adding light to the scene.
 * @constructor
 * @class
 * @abstract
 * @extends ActorComponent
 */
function BaseLightComponent()
{
    ActorComponent.apply(this);

    this.m_colour = new THREE.Color("rgb(255, 255, 0)");
}

BaseLightComponent.prototype = Class.extend(ActorComponent,
{
    /**
     * Colour of the light component.
     * @type {THREE.Color}
     */
    m_colour: null,
    /**
     * Scene object used for presenting the light component.
     * @type {THREE.Light}
     */
    m_lightObject: null,
    /**
     * Creates the light object for the light component.
     *
     * @returns {THREE.Light}
     * @protected
     */
    _vCreateLightObject: notImplemented,
    /**
     * Gets the scene object.
     *
     * @returns {THREE.Light} Scene object.
     * @protected
     */
    _vGetLightObject: function _vGetLightObject()
    {
        if (!this.m_lightObject)
        {
            this.m_lightObject = this._vCreateLightObject();
            this.m_lightObject.matrixAutoUpdate = false;
        }

        return this.m_lightObject;
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
     * Destroys the actor component.
     */
    vDestroy: function vDestroy()
    {
        if (this.m_owner.m_light === this)
        {
            this.m_owner.m_light = null;
        }
    },
    /**
     * Initializes the Actor Component.
     *
     * @param {{colour: string|number}} data Data of the component.
     * @returns {Promise} Promise of initialization of component.
     */
    vInitialise: function vInitialise(data)
    {
        if (this.m_owner.m_light)
        {
            SE_ERROR("Cannot add more than one light components to one actor. Actor ID: " + this.m_owner.m_id);
            return Promise.reject();
        }

        this.m_owner.m_light = this;

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
        var eventData = new EventData_ModifiedLightComponent(this.m_owner.m_id);
        this.m_owner.m_game.m_eventService.triggerEvent(eventData);
    },
    /**
     * Called when the component is requested to update.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        // TODO: Get the global position, rotation and scale
        var position = this.m_owner.m_transform.m_localPosition;
        var rotation = this.m_owner.m_transform.m_localRotation;
        var scale = this.m_owner.m_transform.m_localScale;

        var lightObject = this.m_lightObject;
        lightObject.position.x = position.x;
        lightObject.position.y = position.y;
        lightObject.position.z = position.z;

        lightObject.rotation.x = rotation.x;
        lightObject.rotation.y = rotation.y;
        lightObject.rotation.z = rotation.z;

        lightObject.scale.x = scale.x;
        lightObject.scale.y = scale.y;
        lightObject.scale.z = scale.z;

        lightObject.updateMatrix();
    },
    /**
     * Called after the initialization has been completed.
     */
    vPostInitialise: function vPostInitialise()
    {
        var eventData = new EventData_NewLightComponent(this.m_owner.m_id, this._vGetLightObject());
        this.m_owner.m_game.m_eventService.triggerEvent(eventData);
    }
});