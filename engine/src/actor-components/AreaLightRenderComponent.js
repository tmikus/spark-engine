/**
 * Render component used for lighting the scene using area light.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function AreaLightRenderComponent()
{
    BaseRenderComponent.apply(this);
}

AreaLightRenderComponent.s_name = "AreaLightRenderComponent";

AreaLightRenderComponent.prototype = Class.extend(BaseRenderComponent,
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
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: function _vCreateSceneObject()
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
        return AreaLightRenderComponent.s_name;
    }
});