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
     * Camera component used for rendering the scene.
     * @type {BaseCameraComponent}
     */
    m_camera: null,
    /**
     * Camera object used for rendering the scene.
     * This is actual THREE.js object.
     * @type {THREE.Camera}
     */
    m_cameraObject: null,
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
     * Height of the renderer.
     * @type {number}
     */
    m_rendererHeight: 0,
    /**
     * Width of the renderer.
     * @type {number}
     */
    m_rendererWidth: 0,
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

        // Disposing the camera
        if (this.m_camera)
        {
            this.m_cameraObject = null;
            this.m_camera = null;
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
        // If camera is assigned then let it know that device was lost.
        if (this.m_camera)
        {
            this.m_cameraObject = null;
            this.m_camera.vOnDeviceLost();
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
        this.m_rendererHeight = height;
        this.m_rendererWidth = width;

        // If camera is assigned then let it know that device was restored.
        if (this.m_camera)
        {
            this.m_camera.vOnDeviceRestored();
            this.m_cameraObject = this.m_camera.vGetCameraObject();
        }
    },
    /**
     * Called before rendering has started.
     */
    preRender: function preRender()
    {
        if (this.m_camera && this.m_camera.m_isModified)
        {
            var transform = this.m_camera.m_owner.m_transform;
            var position = transform.m_localPosition;
            var rotation = transform.m_localRotation;

            this.m_scene.position.x = -position.x;
            this.m_scene.position.y = -position.y;
            this.m_scene.position.z = -position.z;

            this.m_scene.rotation.x = rotation.x;
            this.m_scene.rotation.y = rotation.y;
            this.m_scene.rotation.z = rotation.z;

            this.m_scene.updateMatrix();

            this.m_camera.m_isModified = false;
        }

        this.m_sceneManager.onPreRender();
    },
    /**
     * Called after rendering was done.
     */
    postRender: function postRender()
    {
        if (this.m_cameraObject)
        {
            this.m_renderer.render(this.m_scene, this.m_cameraObject);
        }

        this.m_sceneManager.onPostRender();
    },
    /**
     * Sets the active camera to specified instance of Camera component.
     *
     * @param {BaseCameraComponent} camera Camera component.
     */
    setActiveCamera: function setActiveCamera(camera)
    {
        if (this.m_camera)
        {
            this.m_camera.vOnDeviceLost();
        }

        this.m_camera = camera;

        if (camera)
        {
            this.m_camera.vOnDeviceRestored();
            this.m_cameraObject = camera.vGetCameraObject();
        }
        else
        {
            this.m_cameraObject = null;
        }
    }
};