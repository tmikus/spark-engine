/**
 * Renderer for rendering information related to a human game view.
 *
 * @param {SparkEngineApp} game Game to which this view renderer is added.
 * @param {Renderer} renderer Renderer used for rendering of the screen.
 * @param {number} viewId ID of the view rendered by this view renderer.
 * @class
 * @implements IViewRenderer
 */
function HumanViewRenderer(game, renderer, viewId)
{
    this.m_game = game;
    this.m_id = viewId;
    this.m_renderer = renderer;
}

HumanViewRenderer.prototype =
{
    /**
     * Game to which this view renderer is added.
     * @type {SparkEngineApp}
     */
    m_game: null,
    /**
     * ID of the view rendered by this view renderer.
     * @type {number}
     */
    m_id: INVALID_GAME_VIEW_ID,
    /**
     * Renderer used for rendering on the screen.
     * @type {Renderer}
     */
    m_renderer: null,
    /**
     * Destroys the view renderer.
     */
    vDestroy: function vDestroy()
    {

    },
    /**
     * Initialises the view renderer.
     *
     * @returns {Promise} Promise of initialising the view renderer.
     */
    vInitialise: function vInitialise()
    {
        return Promise.resolve();
    },
    /**
     * Called when the rendering device was lost.
     */
    vOnDeviceLost: function vOnDeviceLost()
    {

    },
    /**
     * Called when the rendering device was restored.
     */
    vOnDeviceRestored: function vOnDeviceRestored()
    {

    },
    /**
     * Renders the view on the screen.
     */
    vRender: function vRender()
    {

    }
};