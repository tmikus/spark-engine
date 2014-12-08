/**
 * Camera component used for creating in-game perspective camera.
 * @constructor
 * @class
 * @extends BaseCameraComponent
 */
function PerspectiveCameraComponent()
{
    BaseCameraComponent.apply(this);
}

PerspectiveCameraComponent.s_name = "PerspectiveCamera";

PerspectiveCameraComponent.prototype = Class.extend(BaseCameraComponent,
{
    /**
     * Far clipping plane of the camera.
     * @type {number}
     */
    m_farPlane: 1000,
    /**
     * Vertical field of view of the camera.
     * @type {number}
     */
    m_fov: 65,
    /**
     * Near clipping plane of the camera.
     * @type {number}
     */
    m_nearPlane: 0.1,
    /**
     * Creates the camera object.
     *
     * @returns {THREE.Camera}
     * @protected
     */
    _vCreateCameraObject: function _vCreateCameraObject()
    {
        var renderer = this.m_owner.m_game.m_renderer;

        return new THREE.PerspectiveCamera(this.m_fov, renderer.m_rendererWidth / renderer.m_rendererHeight, this.m_nearPlane, this.m_farPlane);
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
        if (data.farPlane)
        {
            this.m_farPlane = data.farPlane;
        }

        if (data.fov)
        {
            this.m_fov = data.fov;
        }

        if (data.nearPlane)
        {
            this.m_nearPlane = data.nearPlane;
        }

        return Promise.resolve();
    },
    /**
     * Gets the name of the component.
     *
     * @returns {string} Name of the component.
     */
    vGetName: function vGetName()
    {
        return PerspectiveCameraComponent.s_name;
    }
});