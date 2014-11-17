/**
 * Render component used for presenting actor on the screen as a sphere
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function SphereRenderComponent()
{
    BaseRenderComponent.apply(this);
}

SphereRenderComponent.s_name = "SphereRenderComponent";

SphereRenderComponent.prototype = Class.extend(BaseRenderComponent,
{
    /**
     * Radius of the sphere to render.
     * @type {number}
     */
    m_radius: null,
    /**
     * Number of segments used by the sphere.
     * @type {number}
     */
    m_segments: null,
    /**
     * Should the sphere be rendered using wireframe?
     * @type {boolean}
     */
    m_wireframe: false,
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: function _vCreateSceneObject()
    {
        var geometry = new THREE.SphereGeometry(this.m_radius, this.m_segments, this.m_segments);
        var material = new THREE.MeshBasicMaterial({ color: this.m_colour, wireframe: this.m_wireframe });
        return new THREE.Mesh(geometry, material);
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
        if (data.radius)
        {
            this.m_radius = data.radius;
        }

        if (data.segments)
        {
            this.m_segments = data.segments;
        }

        if (data.wireframe)
        {
            this.m_wireframe = data.wireframe;
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
        return SphereRenderComponent.s_name;
    }
});