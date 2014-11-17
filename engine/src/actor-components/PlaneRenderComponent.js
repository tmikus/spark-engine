/**
 * Render component used for presenting actor on the screen as a plane.
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function PlaneRenderComponent()
{
    BaseRenderComponent.apply(this);
}

PlaneRenderComponent.s_name = "PlaneRenderComponent";

PlaneRenderComponent.prototype = Class.extend(BaseRenderComponent,
{
    /**
     * Height of the plane.
     * @type {number}
     */
    m_height: 1,
    /**
     * Number of height segments.
     * @type {number}
     */
    m_heightSegments: 1,
    /**
     * Width of the plane.
     * @type {number}
     */
    m_width: 1,
    /**
     * Number of width segments.
     * @type {number}
     */
    m_widthSegments: 1,
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
        var geometry = new THREE.PlaneGeometry(this.m_width, this.m_height, this.m_widthSegments, this.m_heightSegments);
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
        if (data.height)
        {
            this.m_height = data.height;
        }

        if (data.heightSegments)
        {
            this.m_heightSegments = data.heightSegments;
        }

        if (data.width)
        {
            this.m_width = data.width;
        }

        if (data.widthSegments)
        {
            this.m_widthSegments = data.widthSegments;
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
        return PlaneRenderComponent.s_name;
    }
});