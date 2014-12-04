/**
 * Light component used for lighting the scene using ambient light.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function AmbientLightComponent()
{
    BaseRenderComponent.apply(this);
}

AmbientLightComponent.s_name = "AmbientLight";

AmbientLightComponent.prototype = Class.extend(BaseLightComponent,
{
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Light}
     * @protected
     */
    _vCreateLightObject: function _vCreateLightObject()
    {
        return new THREE.AmbientLight(this.m_colour);
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
        return AmbientLightComponent.s_name;
    }
});