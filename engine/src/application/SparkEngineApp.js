/**
 * A class of the application built using Spark Engine.
 * This is a base class for every game.
 * Initialisation should be done in the extending class
 * @constructor
 * @class
 * @abstract
 */
function SparkEngineApp()
{
    this.m_browserResizedBinding = Function.debounce(this._onBrowserResized.bind(this), 300);
    this.m_renderBinding = this._render.bind(this);
    this.m_gameOptions = new GameOptions(this);
}

SparkEngineApp.prototype =
{
    /**
     * Binding to the event of resizing browser.
     * @type {Function}
     */
    m_browserResizedBinding: null,
    /**
     * Instance of the event service.
     * @type {EventService}
     */
    m_eventService: null,
    /**
     * Instance of the game logic.
     * @type {IGameLogic}
     */
    m_gameLogic: null,
    /**
     * Instance of the game options.
     * @type {GameOptions}
     */
    m_gameOptions: null,
    /**
     * Instance of the game time.
     * Used for tracking the game time from one update to another.
     * @type {GameTime}
     */
    m_gameTime: null,
    /**
     * Binding to the 'render' method.
     * @type {Function}
     */
    m_renderBinding: null,
    /**
     * Instance of the renderer.
     * @type {Renderer}
     */
    m_renderer: null,
    /**
     * Instance of the resource manager.
     * @type {ResourceManager}
     */
    m_resourceManager: null,
    /**
     * Instance of the script manager.
     * Used for executing scripts in the game.
     * @type {ScriptManager}
     */
    m_scriptManager: null,
    /**
     * ID of interval used for updating game logic.
     * @type {number}
     */
    m_updateLoopInterval: null,
    /**
     * Initialises the game audio.
     *
     * @returns {Promise} Promise of initialisation of audio system.
     * @protected
     */
    _initialiseAudio: function _initialiseAudio()
    {
        // TODO: Implement
    },
    /**
     * Initialises the handlers for the browser which are monitoring the size changes.
     * @protected
     */
    _initialiseBrowserHandlers: function _initialiseBrowserHandlers()
    {
        SE_INFO("Initialising browser handlers.");
        window.addEventListener("resize", this.m_browserResizedBinding);
    },
    /**
     * Initialises the event service.
     *
     * @returns {boolean} Promise of initialisation of event service.
     * @protected
     */
    _initialiseEventService: function _initialiseEventService()
    {
        const exceptionMessage = "Initialisation of the Event Service has failed!";
        var exception = null;

        try
        {
            SE_INFO("Initialising Event Service.");
            this.m_eventService = new EventService();
            return true;
        }
        catch (ex)
        {
            exception = ex;
        }

        SE_FATAL(exceptionMessage, exception);
        throw exception || exceptionMessage;
    },
    /**
     * Initialises the game logic worker.
     *
     * @returns {Promise} Promise of initialisation of game logic.
     * @protected
     */
    _initialiseGameLogic: function _initialiseGameLogic()
    {
        SE_INFO("Initialising Game Logic.");

        return this._vCreateGameLogic()
            .then(function (gameLogic)
            {
                this.m_gameLogic = gameLogic;
            }.bind(this))
            ["catch"](function ()
        {
            SE_ERROR("Could not initialise Game Logic.");
        });
    },
    /**
     * Initialises the game time class.
     * The class is being used for tracking the time.
     * @returns {boolean} True if initialisation was successful; otherwise false.
     * @protected
     */
    _initialiseGameTime: function _initialiseGameTime()
    {
        try
        {
            SE_INFO("Initialising Game Time.");
            this.m_gameTime = new GameTime();
            return true;
        }
        catch (ex)
        {
            SE_ERROR("Could not initialise Game Time!");
            throw ex;
        }
    },
    /**
     * Initialises the renderer.
     *
     * @returns {boolean} True if initialisation succeeded; otherwise false.
     * @protected
     */
    _initialiseRenderer: function _initialiseRenderer()
    {
        const exceptionMessage = "Initialisation of the renderer has failed!";
        var exception = null;

        try
        {
            SE_INFO("Initialising Renderer.");
            this.m_renderer = new Renderer(this);

            if (this.m_renderer.initialise())
            {
                this.m_renderer.onDeviceRestored();
                return true;
            }
        }
        catch (ex)
        {
            exception = ex;
        }

        SE_FATAL(exceptionMessage, exception);
        throw exception || exceptionMessage;
    },
    /**
     * Initialises the resource manager.
     *
     * @returns {Promise} Promise of initialisation of resource manager.
     * @protected
     */
    _initialiseResourceManager: function _initialiseResourceManager()
    {
        try
        {
            SE_INFO("Initialising Game Resource Manager.");
            this.m_resourceManager = new ResourceManager(this, this._vGetResourceUrl());
            return this.m_resourceManager.initialise();
        }
        catch (ex)
        {
            SE_FATAL("Initialisation of resource manager has failed!", ex);
            throw ex;
        }
    },
    /**
     * Initialises the script manager
     *
     * @returns {Promise} Promise of initialisation of script manager.
     * @protected
     */
    _initialiseScriptManager: function _initialiseScriptManager()
    {
        try
        {
            SE_INFO("Initialising Script Manager.");
            this.m_scriptManager = new ScriptManager(this);
            return this.m_scriptManager.initialise();
        }
        catch (ex)
        {
            SE_FATAL("Initialisation of script manager has failed!", ex);
            throw ex;
        }
    },
    /**
     * Loads the game options from the server and overwrites them with client settings from local storage.
     *
     * @returns {Promise} Promise of loading game options.
     * @protected
     */
    _loadGameOptions: function _loadGameOptions()
    {
        return this.m_gameOptions.loadFromServer(this._vGetGameOptionsResourceName())
            .then(this.m_gameOptions.loadFromLocalStorage.bind(this.m_gameOptions))
            ["catch"](function ()
            {
                SE_FATAL("Could not load game options!");
            });
    },
    /**
     * Called when the browser was resized.
     * @protected
     */
    _onBrowserResized: function _onBrowserResized()
    {
        this._onDeviceLost();
        this._onDeviceRestored();
    },
    /**
     * Called when the rendering device was lost.
     * Might happen when user rotated the device or changed size of screen.
     * @private
     */
    _onDeviceLost: function _onDeviceLost()
    {
        this.m_eventService.triggerEvent(new EventData_DeviceLost());

        // TODO: Informing game views about this event.

        this.m_renderer.onDeviceLost();
    },
    /**
     * Called when the rendering was restored.
     * Might happen after user rotated the device or changed size of screen.
     */
    _onDeviceRestored: function _onDeviceRestored()
    {
        this.m_renderer.onDeviceRestored();

        // TODO: Informing game views about this event.

        this.m_eventService.triggerEvent(new EventData_DeviceRestored());
    },
    /**
     * Renders the current frame and schedules new frame to be rendered.
     * @protected
     */
    _render: function _render()
    {
        this.m_renderer.preRender();

        // TODO: Rendering game views

        this.m_renderer.postRender();

        requestAnimationFrame(this.m_renderBinding);
    },
    /**
     * Creates game logic used by the game.
     *
     * @returns {Promise} Promise of Game Logic creation.
     * @protected
     * @virtual
     */
    _vCreateGameLogic: notImplemented,
    /**
     * Gets the name of the resource file containing game options.
     *
     * @returns {string} Name of resource containing game options.
     * @protected
     * @virtual
     */
    _vGetGameOptionsResourceName: notImplemented,
    /**
     * Gets the resource file URL.
     *
     * @returns {string} URL of the resource file.
     * @protected
     */
    _vGetResourceUrl: function _vGetResourceUrl()
    {
        return "json/resources.json";
    },
    /**
     * Called when the game requested the logic to be updated.
     * @protected
     * @virtual
     */
    _vOnUpdate: function _vOnUpdate()
    {
        // Updating game time.
        this.m_gameTime.update();

        if (this.m_gameLogic)
        {
            this.m_eventService.update(this.m_gameTime.m_unscaledTimeSinceStartup, 20);
            this.m_gameLogic.vOnUpdate(this.m_gameTime);
        }
    },
    /**
     * Registers the events which are serializable and can be shared between instances of the game.
     * @protected
     * @virtual
     */
    _vRegisterEvents: function _vRegisterEvents()
    {
        try
        {
            SE_INFO("Registering events.");

            var eventService = this.m_eventService;
            // TODO: Registering events which are meant to be send over the network...
        }
        catch (ex)
        {
            SE_ERROR("Could not register events!", ex);
            throw ex;
        }
    },
    /**
     * Initialises the spark engine application.
     *
     * @returns {Promise} Promise of the application initialisation.
     */
    initialise: function initialise()
    {
        return this._initialiseResourceManager()
            .then(this._loadGameOptions.bind(this))
            .then(this._initialiseGameTime.bind(this))
            .then(this._initialiseEventService.bind(this))
            .then(this._vRegisterEvents.bind(this))
            .then(this._initialiseRenderer.bind(this))
            .then(this._initialiseAudio.bind(this))
            .then(this._initialiseScriptManager.bind(this))
            .then(this._initialiseGameLogic.bind(this))
            .then(this._initialiseBrowserHandlers.bind(this))
            .then(function ()
            {
                SE_INFO("Game initialised.");
            })
            ["catch"](function()
            {
                SE_FATAL("Game could not be initialised.");
            });
    },
    /**
     * Starts the game loop.
     */
    startGameLoop: function startGameLoop()
    {
        SE_INFO("Starting game logic loop.");
        this._vOnUpdate();
        this.m_updateLoopInterval = setInterval(this._vOnUpdate.bind(this), 0);

        SE_INFO("Starting game rendering loop.");
        this._render();
    },
    /**
     * Gets name of the resource containing levels configuration
     *
     * @returns {string} Name of the configuration resource.
     * @virtual
     */
    vGetLevelsConfigurationResourceName: notImplemented,
    /**
     * Loads the game using configuration from game options.
     *
     * @returns  {Promise} Promise of loading a game.
     * @virtual
     */
    vLoadGame: function vLoadGame()
    {
        SE_INFO("Starting loading the game in Game Worker.");
        this.m_gameLogic.vLoadGame(this.m_gameLogic.m_levelManager.getCurrentLevelName())
            .then(function ()
            {
                this.vChangeState(BaseGameState.WaitingForPlayersToLoadEnvironment);
            }.bind(this));
    },
    /**
     * Called after the initialisation is done.
     * @virtual
     */
    vPostInitialise: function vPostInitialise()
    {
        // TODO: Implement
    }
};