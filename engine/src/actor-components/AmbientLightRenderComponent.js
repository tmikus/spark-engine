/**
 * Render component used for lighting the scene using ambient light.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function AmbientLightRenderComponent()
{
    BaseRenderComponent.apply(this);
}

AmbientLightRenderComponent.s_name = "AmbientLightRenderComponent";

AmbientLightRenderComponent.prototype = Class.extend(BaseRenderComponent,
{
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: function _vCreateSceneObject()
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
        return AmbientLightRenderComponent.s_name;
    }
});