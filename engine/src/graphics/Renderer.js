const RendererCameraFarPlane = 1000;
const RendererCameraFOV = 65;
const RendererCameraNearPlane = 0.1;

/**
 * Rendering engine used for rendering game on the screen.
 *
 * @param {SparkEngineApp} game Instance of the game creating this renderer.
 * @constructor
 * @class
 */
function Renderer(game)
{
    this.m_game = game;
}

Renderer.prototype =
{
    /**
     * Camera used for rendering the scene.
     * @type {THREE.PerspectiveCamera}
     */
    m_camera: null,
    /**
     * Instance of the game which created this renderer.
     * @type {SparkEngineApp}
     */
    m_game: null,
    /**
     * Instance of the game canvas used for presenting the scene.
     * @type {HTMLCanvasElement}
     */
    m_gameCanvas: null,
    /**
     * Renderer used for rendering the scene.
     * @type {THREE.WebGLRenderer|THREE.CanvasRenderer}
     */
    m_renderer: null,
    /**
     * Instance of the scene used for rendering.
     * @type {THREE.Scene}
     */
    m_scene: null,
    /**
     * Instance of the scene manager.
     * @type {SceneManager}
     */
    m_sceneManager: null,
    /**
     * Destroys the renderer.
     */
    destroy: function destroy()
    {
        // Informing the renderer about loosing the device
        this.onDeviceLost();

        // Disposing scene manager
        if (this.m_sceneManager)
        {
            this.m_sceneManager.destroy();
            this.m_sceneManager = null;
        }

        // Disposing the scene
        if (this.m_scene)
        {
            this.m_scene = null;
        }

        // Disposing the renderer
        if (this.m_renderer)
        {
            this.m_renderer = null;
        }
    },
    /**
     * Initialises the renderer.
     *
     * @returns {boolean} True if initialisation was successful; otherwise false.
     */
    initialise: function initialise()
    {
        if (!document.body)
        {
            SE_ERROR("Could not initialise the renderer before the document is loaded!");
            return false;
        }

        var gameCanvas = document.createElement("canvas");
        gameCanvas.id = "spark-engine-canvas";
        gameCanvas.style.height = "100%";
        gameCanvas.style.width = "100%";
        this.m_gameCanvas = gameCanvas;

        document.body.appendChild(gameCanvas);

        // Checking for webGL support.
        var supportsWebGL;
        try
        {
            var canvas = document.createElement("canvas");
            supportsWebGL = !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
        }
        catch (e)
        {
            supportsWebGL = false;
        }

        // Initialising the renderer with supported rendering engine.
        if (supportsWebGL)
        {
            SE_INFO("Initialising renderer with WebGL context.");
            this.m_renderer = new THREE.WebGLRenderer({ canvas: gameCanvas });
        }
        else
        {
            SE_INFO("Initialising renderer with 2D context.");
            this.m_renderer = new THREE.CanvasRenderer({ canvas: gameCanvas });
        }

        // Initialising the scene
        this.m_scene = new THREE.Scene();

        // Initialising the scene manager
        this.m_sceneManager = new SceneManager(this, this.m_scene);
        this.m_sceneManager.initialise();

        return true;
    },
    /**
     * Called when the rendering device was lost.
     * Might happen when user rotated the device or changed size of screen.
     */
    onDeviceLost: function onDeviceLost()
    {
        // Disposing camera. It depends on the screen size so is invalid.
        if (this.m_camera)
        {
            this.m_camera = null;
        }

        // If the game canvas is hosted outside the document (for example game editor?)
        if (this.m_gameCanvas.parentNode !== document.body)
        {
            this.m_gameCanvas.style.display = "none";
        }
    },
    /**
     * Called when the rendering was restored.
     * Might happen after user rotated the device or changed size of screen.
     */
    onDeviceRestored: function onDeviceRestored()
    {
        var height = window.innerHeight;
        var width = window.innerWidth;

        // If the game canvas is hosted outside the document (for example game editor?)
        if (this.m_gameCanvas.parentNode !== document.body)
        {
            var gameCanvasBoundingBox = this.m_gameCanvas.parentNode.getBoundingClientRect();
            height = gameCanvasBoundingBox.height;
            width = gameCanvasBoundingBox.width;

            this.m_gameCanvas.style.display = "";
        }

        // Setting renderer size
        this.m_renderer.setSize(width, height);

        // Creating new game camera
        this.m_camera = new THREE.PerspectiveCamera(RendererCameraFOV, width / height, RendererCameraNearPlane, RendererCameraFarPlane);
        this.m_camera.position.y = 100;
        this.m_camera.position.z = 300;
    },
    /**
     * Called before rendering has started.
     */
    preRender: function preRender()
    {
    },
    /**
     * Called after rendering was done.
     */
    postRender: function postRender()
    {
        this.m_renderer.render(this.m_scene, this.m_camera);
    }
};