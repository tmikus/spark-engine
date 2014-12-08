/**
 * Camera component used for creating in-game camera.
 * @constructor
 * @class
 * @abstract
 * @extends ActorComponent
 */
function BaseCameraComponent()
{
    ActorComponent.apply(this);
}

BaseCameraComponent.prototype = Class.extend(ActorComponent,
{
    /**
     * Camera object
     * @type {THREE.Camera}
     */
    m_cameraObject: null,
    /**
     * Is this camera a default camera?
     * If set to true then as soon as the component is created it checks if there is a camera assigned to the scene.
     * If there is no camera then it sets itself as an active camera.
     * @type {boolean}
     */
    m_default: false,
    /**
     * Creates the camera object.
     *
     * @returns {THREE.Camera}
     * @protected
     */
    _vCreateCameraObject: notImplemented,
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
     * Checks if the camera is set as active.
     *
     * @returns {Boolean} True if is active; otherwise false.
     */
    isActive: function isActive()
    {
        return this.m_owner.m_game.m_renderer.m_camera === this;
    },
    /**
     * Sets the camera as the active camera.
     */
    setAsActive: function setAsActive()
    {
        this.m_owner.m_game.m_renderer.setActiveCamera(this);
    },
    /**
     * Updates the camera matrix with the values from transform component.
     */
    updateMatrix: function updateMatrix()
    {
        var cameraObject = this.vGetCameraObject();
        var transform = this.m_owner.m_transform;

        var position = transform.m_localPosition;
        var rotation = transform.m_localRotation;
        var scale = transform.m_localScale;

        cameraObject.position.x = position.x;
        cameraObject.position.y = position.y;
        cameraObject.position.z = position.z;

        cameraObject.rotation.x = rotation.x;
        cameraObject.rotation.y = rotation.y;
        cameraObject.rotation.z = rotation.z;

        cameraObject.scale.x = scale.x;
        cameraObject.scale.y = scale.y;
        cameraObject.scale.z = scale.z;

        cameraObject.updateMatrix();
    },
    /**
     * Destroys the actor component.
     */
    vDestroy: function vDestroy()
    {
        var owner = this.m_owner;
        var renderer = owner.m_game.m_renderer;

        if (owner.m_camera === this)
        {
            owner.m_camera = null;
        }

        if (renderer.m_camera === this)
        {
            renderer.m_camera = null;
        }
    },
    /**
     * Gets the camera object.
     *
     * @returns {THREE.Camera} Camera object.
     */
    vGetCameraObject: function vGetCameraObject()
    {
        if (!this.m_cameraObject)
        {
            this.m_cameraObject = this._vCreateCameraObject();
            this.m_cameraObject.userData.actorId = this.m_owner.m_id;
            this.m_cameraObject.matrixAutoUpdate = false;
        }

        return this.m_cameraObject;
    },
    /**
     * Initializes the Actor Component.
     *
     * @param {{colour: string|number}} data Data of the component.
     * @returns {Promise} Promise of initialization of component.
     */
    vInitialise: function vInitialise(data)
    {
        if (this.m_owner.m_camera)
        {
            SE_ERROR("Cannot add more than one camera components to one actor. Actor ID: " + this.m_owner.m_id);
            return Promise.reject();
        }

        this.m_owner.m_camera = this;

        if (data.default)
        {
            this.m_default = data.default;
        }

        return this._vDelegateInitialise(data);
    },
    /**
     * Called when the device was lost.
     * Destroys the camera because it is not valid now.
     * @virtual
     */
    vOnDeviceLost: function vOnDeviceLost()
    {
    },
    /**
     * Called when the device was restored.
     * Re-creates the camera based on new dimensions of the screen.
     * @virtual
     */
    vOnDeviceRestored: function vOnDeviceRestored()
    {
        this.m_cameraObject = null;
        this.vGetCameraObject();
    },
    /**
     * Called after the initialization has been completed.
     */
    vPostInitialise: function vPostInitialise()
    {
        this.updateMatrix();

        if (this.m_default)
        {
            var renderer = this.m_owner.m_game.m_renderer;
            if (!renderer.m_camera)
            {
                renderer.setActiveCamera(this);
            }
        }
    }
});