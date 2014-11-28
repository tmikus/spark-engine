/**
 * Light component used for lighting the scene using area light.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function AreaLightComponent()
{
    BaseRenderComponent.apply(this);
}

AreaLightComponent.s_name = "AreaLightComponent";

AreaLightComponent.prototype = Class.extend(BaseLightComponent,
{
    /**
     * Height of the light area.
     * @type {number}
     */
    m_height: 1,
    /**
     * Intensity of the light.
     * @type {number}
     */
    m_intensity: 1,
    /**
     * Width of the light area.
     * @type {number}
     */
    m_width: 1,
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Light}
     * @protected
     */
    _vCreateLightObject: function _vCreateLightObject()
    {
        var light = new THREE.AreaLight(this.m_colour, this.m_intensity);
        light.height = this.m_height;
        light.width = this.m_width;

        // TODO: Set other light settings

        return light;
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
        if (data.height)
        {
            this.m_height = data.height;
        }

        if (data.width)
        {
            this.m_width = data.width;
        }

        // TODO: Load other light settings.

        return Promise.resolve();
    },
    /**
     * Gets the name of the component.
     *
     * @returns {string} Name of the component.
     */
    vGetName: function vGetName()
    {
        return AreaLightComponent.s_name;
    }
});