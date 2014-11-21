/**
 * Render component used for lighting the scene using directional light.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function DirectionalLightRenderComponent()
{
    BaseRenderComponent.apply(this);
}

DirectionalLightRenderComponent.s_name = "DirectionalLightRenderComponent";

DirectionalLightRenderComponent.prototype = Class.extend(BaseRenderComponent,
{
    /**
     * Intensity of the light.
     * @type {number}
     */
    m_intensity: 1,
    /**
     * If set to true will only cast shadow but not contribute any lighting (as if intensity was 0 but cheaper to compute).
     * @type {boolean}
     */
    m_onlyShadow: false,
    /**
     * Shadow map bias.
     * @type {number}
     */
    m_shadowBias: 0,
    /**
     * Orthographic shadow camera frustum parameter.
     * @type {number}
     */
    m_shadowCameraBottom: -500,
    /**
     * Orthographic shadow camera frustum parameter.
     * @type {number}
     */
    m_shadowCameraFar: 5000,
    /**
     * Orthographic shadow camera frustum parameter.
     * @type {number}
     */
    m_shadowCameraLeft: -500,
    /**
     * Orthographic shadow camera frustum parameter.
     * @type {number}
     */
    m_shadowCameraNear: 50,
    /**
     * Orthographic shadow camera frustum parameter.
     * @type {number}
     */
    m_shadowCameraRight: 500,
    /**
     * Orthographic shadow camera frustum parameter.
     * @type {number}
     */
    m_shadowCameraTop: 500,
    /**
     * Show debug shadow camera frustum.
     * @type {boolean}
     */
    m_shadowCameraVisible: false,
    /**
     * Darkness of shadow casted by this light (from 0 to 1).
     * @type {number}
     */
    m_shadowDarkness: 0.5,
    /**
     * Shadow map texture height in pixels.
     * @type {number}
     */
    m_shadowMapHeight: 512,
    /**
     * Shadow map texture width in pixels.
     * @type {number}
     */
    m_shadowMapWidth: 512,
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: function _vCreateSceneObject()
    {
        var light = new THREE.DirectionalLight(this.m_colour, this.m_intensity);
        light.intensity = this.m_intensity;
        light.onlyShadow = this.m_onlyShadow;
        light.shadowCameraBottom = this.m_shadowCameraBottom;
        light.shadowCameraFar = this.m_shadowCameraFar;
        light.shadowCameraLeft = this.m_shadowCameraLeft;
        light.shadowCameraNear = this.m_shadowCameraNear;
        light.shadowCameraRight = this.m_shadowCameraRight;
        light.shadowCameraTop = this.m_shadowCameraTop;
        light.shadowCameraVisible = this.m_shadowCameraVisible;
        light.shadowBias = this.m_shadowBias;
        light.shadowDarkness = this.m_shadowDarkness;
        light.shadowMapHeight = this.m_shadowMapHeight;
        light.shadowMapWidth = this.m_shadowMapWidth;

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
        if (data.intensity !== undefined)
        {
            this.m_intensity = data.intensity;
        }

        if (data.onlyShadow !== undefined)
        {
            this.m_onlyShadow = data.onlyShadow;
        }

        if (data.shadowCameraBottom !== undefined)
        {
            this.m_shadowCameraBottom = data.shadowCameraBottom;
        }

        if (data.shadowCameraFar !== undefined)
        {
            this.m_shadowCameraFar = data.shadowCameraFar;
        }

        if (data.shadowCameraLeft !== undefined)
        {
            this.m_shadowCameraLeft = data.shadowCameraLeft;
        }

        if (data.shadowCameraNear !== undefined)
        {
            this.m_shadowCameraNear = data.shadowCameraNear;
        }

        if (data.shadowCameraRight !== undefined)
        {
            this.m_shadowCameraRight = data.shadowCameraRight;
        }

        if (data.shadowCameraTop !== undefined)
        {
            this.m_shadowCameraTop = data.shadowCameraTop;
        }

        if (data.shadowCameraVisible !== undefined)
        {
            this.m_shadowCameraVisible = data.shadowCameraVisible;
        }

        if (data.shadowBias !== undefined)
        {
            this.m_shadowBias = data.shadowBias;
        }

        if (data.shadowDarkness !== undefined)
        {
            this.m_shadowDarkness = data.shadowDarkness;
        }

        if (data.shadowMapHeight !== undefined)
        {
            this.m_shadowMapHeight = data.shadowMapHeight;
        }

        if (data.shadowMapWidth !== undefined)
        {
            this.m_shadowMapWidth = data.shadowMapWidth;
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
        return DirectionalLightRenderComponent.s_name;
    }
});