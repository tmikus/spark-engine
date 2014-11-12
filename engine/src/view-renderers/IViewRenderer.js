/**
 * Interface for the view renderer.
 * Used for rendering information related to a game view.
 *
 * @param {SparkEngineApp} game Game to which this view renderer is added.
 * @param {Renderer} renderer Renderer used for rendering of the screen.
 * @param {number} viewId ID of the view rendered by this view renderer.
 * @interface
 */
function IViewRenderer(game, renderer, viewId)
{
}

IViewRenderer.prototype =
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
    vDestroy: notImplemented,
    /**
     * Initialises the view renderer.
     *
     * @returns {Promise} Promise of initialising the view renderer.
     */
    vInitialise: notImplemented,
    /**
     * Called when the rendering device was lost.
     */
    vOnDeviceLost: notImplemented,
    /**
     * Called when the rendering device was restored.
     */
    vOnDeviceRestored: notImplemented,
    /**
     * Renders the view on the screen.
     */
    vRender: notImplemented
};