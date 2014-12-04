/**
 * Render component used for lighting the scene using hemisphere light.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function HemisphereLightComponent()
{
    BaseRenderComponent.apply(this);
}

HemisphereLightComponent.s_name = "HemisphereLight";

HemisphereLightComponent.prototype = Class.extend(BaseLightComponent,
{
    /**
     * Light's ground color.
     * @type {number}
     */
    m_groundColour: 0x000000,
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
    _vCreateLightObject: function _vCreateLightObject()
    {
        return new THREE.HemisphereLight(this.m_colour, this.m_groundColour, this.m_intensity);
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
        if (data.groundColour)
        {
            this.m_groundColour = data.groundColour;
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
        return HemisphereLightComponent.s_name;
    }
});