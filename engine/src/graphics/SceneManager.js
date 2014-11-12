/**
 * Class responsible for managing scene and synchronising it with THREE.Scene object.
 *
 * @param {Renderer} renderer Renderer used to render scene.
 * @param {THREE.Scene} scene Scene used by the renderer.
 * @constructor
 * @class
 */
function SceneManager(renderer, scene)
{
    this.m_renderer = renderer;
    this.m_scene = scene;
}

SceneManager.prototype =
{
    /**
     * Renderer used to render scene.
     * @type {Renderer}
     */
    m_renderer: null,
    /**
     * Scene used by the renderer.
     * @type {THREE.Scene}
     */
    m_scene: null,
    /**
     * Destroys the scene manager.
     */
    destroy: function destroy()
    {

    },
    /**
     * Initialises the scene manager.
     *
     * @returns {Promise} promise of initialisation.
     */
    initialise: function initialise()
    {
        return Promise.resolve();
    }
};