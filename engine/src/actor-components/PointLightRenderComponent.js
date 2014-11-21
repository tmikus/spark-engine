/**
 * Render component used for lighting the scene using point light.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function PointLightRenderComponent()
{
    BaseRenderComponent.apply(this);
}

PointLightRenderComponent.s_name = "PointLightRenderComponent";

PointLightRenderComponent.prototype = Class.extend(BaseRenderComponent,
{
    /**
     * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
     * @type {number}
     */
    m_distance: 0,
    /**
     * Intensity of the light.
     * @type {number}
     */
    m_intensity: 1,
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: function _vCreateSceneObject()
    {
        return new THREE.PointLight(this.m_colour, this.m_intensity, this.m_distance);
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
        if (data.distance)
        {
            this.m_distance = data.distance;
        }

        if (data.intensity)
        {
            this.m_intensity = data.intensity;
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
        return PointLightRenderComponent.s_name;
    }
});