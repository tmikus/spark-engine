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
    this.m_gameViewRenderers = [];
}

SparkEngineApp.prototype =
{
    /**
     * Binding to the event of resizing browser.
     * @type {Function}
     */
    m_browserResizedBinding: null,
    /**
     * Worker used for running game logic.
     * @type {Worker}
     */
    m_gameLogicWorker: null,
    /**
     * Instance of the game options.
     * @type {GameOptions}
     */
    m_gameOptions: null,
    /**
     * Array of game view renderers.
     * @type {IViewRenderer[]}
     */
    m_gameViewRenderers: null,
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
     * Creates view renderer based on the creation request.
     *
     * @param {WorkerMessage_CreateViewRendererRequest} message Creation request.
     * @private
     */
    _createViewRenderer: function _createViewRenderer(message)
    {
        SE_INFO("Creating view renderer for view: " + message.m_viewId);

        var gameView = null;
        switch (message.m_viewType)
        {
            case GameViewType.Human:
                gameView = new HumanViewRenderer(this, this.m_renderer, message.m_viewId);
                break;
            default:
                SE_ERROR("Could not create view renderer for type: " + message.m_viewType);
                return;
        }

        this.m_gameViewRenderers.push(gameView);

        gameView.vInitialise()
            .then(function ()
            {
                this.sendMessageToGameLogic(new WorkerMessage_CreateViewRendererResponse(message.m_viewId));
            }.bind(this))
            .catch(function ()
            {
                SE_ERROR("Initialisation of view renderer has failed!");
            });
    },
    /**
     * Destroys the view renderer.
     *
     * @param {WorkerMessage_DestroyViewRendererRequest} message Message containing info about which view to destroy.
     * @private
     */
    _destroyViewRenderer: function _destroyViewRenderer(message)
    {
        SE_INFO("Destroying game view renderer with ID: " + message.m_viewId);

        var view = null;
        var viewIndex = 0;
        var gameViewRenderers = this.m_gameViewRenderers;
        var gameViewRenderersLength = gameViewRenderers.length;

        for (; viewIndex < gameViewRenderersLength; viewIndex++)
        {
            if (gameViewRenderers[viewIndex].m_id != message.m_viewId)
                continue;

            view = gameViewRenderers[viewIndex];
            break;
        }

        if (view)
        {
            view.vDestroy();
            gameViewRenderers.splice(viewIndex, 1);
        }
        else
        {
            SE_WARNING("Could not delete game view renderer. Could not find view with that ID.");
        }
    },
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
     * Initialises the game logic worker.
     *
     * @returns {Promise} Promise of initialisation of game logic.
     * @protected
     */
    _initialiseGameLogicWorker: function _initialiseGameLogicWorker()
    {
        SE_INFO("Initialising Game Logic Worker.");

        return new Promise(function (resolve, reject)
        {
            this.m_gameLogicWorker = new Worker(this._vGetGameLogicUrl());
            this.m_gameLogicWorker.onmessage = function (message)
            {
                if (message.data == WorkerInitialisationStatus.Success)
                {
                    this.m_gameLogicWorker.onmessage = this._processGameLogicMessage.bind(this);
                    resolve();
                }
                else if (!this._processGameLogicMessage(message))
                {
                    SE_ERROR("Initialisation of Game Logic Worker has failed.");
                    reject();
                }
            }.bind(this);
        }.bind(this));
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
     * Loads the game options from the server and overwrites them with client settings from local storage.
     *
     * @returns {Promise} Promise of loading game options.
     * @protected
     */
    _loadGameOptions: function _loadGameOptions()
    {
        return this.m_gameOptions.loadFromServer(this._vGetGameOptionsResourceName())
            .then(this.m_gameOptions.loadFromLocalStorage.bind(this.m_gameOptions))
            .catch(function ()
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
        this.sendMessageToGameLogic(new WorkerMessage_TriggerEvent(EventData_DeviceLost.s_type, null));

        var views = this.m_gameViewRenderers;
        var viewsLength = views.length;
        for (var viewIndex = 0; viewIndex < viewsLength; viewIndex++)
        {
            views[viewIndex].vOnDeviceLost();
        }

        this.m_renderer.onDeviceLost();
    },
    /**
     * Called when the rendering was restored.
     * Might happen after user rotated the device or changed size of screen.
     */
    _onDeviceRestored: function _onDeviceRestored()
    {
        this.m_renderer.onDeviceRestored();

        var views = this.m_gameViewRenderers;
        var viewsLength = views.length;
        for (var viewIndex = 0; viewIndex < viewsLength; viewIndex++)
        {
            views[viewIndex].vOnDeviceRestored();
        }

        this.sendMessageToGameLogic(new WorkerMessage_TriggerEvent(EventData_DeviceRestored.s_type, null));
    },
    /**
     * Processes the game logic message.
     *
     * @param {*} message A message returned from the game logic process.
     * @returns {boolean} Has the message been processed?
     * @private
     */
    _processGameLogicMessage: function _processGameLogicMessage(message)
    {
        switch (message.data.m_type)
        {
            case WorkerMessage_CreateViewRendererRequest.s_type:
                this._createViewRenderer(message.data);
                break;

            case WorkerMessage_DestroyViewRendererRequest.s_type:
                this._destroyViewRenderer(message.data);
                break;

            case WorkerMessage_GameOptionsRequest.s_type:
                this.m_gameOptions.sendOptionsToWorker();
                break;

            case WorkerMessage_ResourceRequest.s_type:
                this.m_resourceManager.resourceRequested(message.data);
                break;

            default:
                return false;
        }

        return true;
    },
    /**
     * Renders the current frame and schedules new frame to be rendered.
     * @protected
     */
    _render: function _render()
    {
        this.m_renderer.preRender();

        // TODO: Is the below code needed?
        var views = this.m_gameViewRenderers;
        var viewsLength = views.length;
        for (var viewIndex = 0; viewIndex < viewsLength; viewIndex++)
        {
            views[viewIndex].vRender();
        }

        this.m_renderer.postRender();

        requestAnimationFrame(this.m_renderBinding);
    },
    /**
     * Gets the game logic file URL
     *
     * @returns {string} URL to the game logic file.
     * @protected
     * @virtual
     */
    _vGetGameLogicUrl: notImplemented,
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
     * Initialises the spark engine application.
     *
     * @returns {Promise} Promise of the application initialisation.
     */
    initialise: function initialise()
    {
        return this._initialiseResourceManager()
            .then(this._loadGameOptions.bind(this))
            .then(this._initialiseRenderer.bind(this))
            .then(this._initialiseAudio.bind(this))
            .then(this._initialiseBrowserHandlers.bind(this))
            .then(this._initialiseGameLogicWorker.bind(this))
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
     * Sends a message to the game logic.
     *
     * @param {IWorkerMessage} message Message to send to game logic.
     */
    sendMessageToGameLogic: function sendMessageToGameLogic(message)
    {
        this.m_gameLogicWorker.postMessage(message);
    },
    /**
     * Starts the game loop.
     */
    startGameLoop: function startGameLoop()
    {
        SE_INFO("Starting game rendering loop.");
        this._render();
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