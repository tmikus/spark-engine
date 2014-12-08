/**
 * Camera component used for creating in-game orthographic camera.
 * @constructor
 * @class
 * @extends BaseCameraComponent
 */
function OrthographicCameraComponent()
{
    BaseCameraComponent.apply(this);
}

OrthographicCameraComponent.s_name = "OrthographicCamera";

OrthographicCameraComponent.prototype = Class.extend(BaseCameraComponent,
{
    /**
     * Creates the camera object.
     *
     * @returns {THREE.Camera}
     * @protected
     */
    _vCreateCameraObject: function _vCreateCameraObject()
    {
        // TODO: Implement the camera creation
        SE_FATAL("OrthographicCamera component is not implemented!");
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
     * Gets the name of the component.
     *
     * @returns {string} Name of the component.
     */
    vGetName: function vGetName()
    {
        return OrthographicCameraComponent.s_name;
    }
});