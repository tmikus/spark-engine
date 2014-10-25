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
    this.m_renderBinding = this._render.bind(this);
}

SparkEngineApp.prototype =
{
    /**
     * Worker used for running game logic.
     * @type {Worker}
     */
    m_gameLogicWorker: null,
    /**
     * Binding to the 'render' method.
     * @type {Function}
     */
    m_renderBinding: null,
    /**
     * Instance of the resource manager.
     * @type {ResourceManager}
     */
    m_resourceManager: null,
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
        // TODO: Implement
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

        return new Promise(function (resolve, reject)
        {
            this.m_gameLogicWorker = new Worker("dist/spark-engine-logic.js");
            this.m_gameLogicWorker.onmessage = function (message)
            {
                if (message.data == WorkerInitialisationStatus.Success)
                {
                    this.m_gameLogicWorker.onmessage = this._processGameLogicMessage.bind(this);
                    resolve();
                }
                else
                {
                    SE_ERROR("Initialisation of Game Logic has failed.");
                    reject();
                }
            }.bind(this);
        }.bind(this));
    },
    /**
     * Initialises the renderer.
     *
     * @returns {Promise} Promise of initialisation of renderer.
     * @protected
     */
    _initialiseRenderer: function _initialiseRenderer()
    {
        // TODO: Implement
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
            this.m_resourceManager = new ResourceManager(this._vGetResourceURL());
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
        // TODO: Implement
    },
    /**
     * Processes the game logic message.
     *
     * @param {*} message A message returned from the game logic process.
     * @private
     */
    _processGameLogicMessage: function _processGameLogicMessage(message)
    {

    },
    /**
     * Renders the current frame and schedules new frame to be rendered.
     * @protected
     */
    _render: function _render()
    {
        // TODO: Implement

        requestAnimationFrame(this.m_renderBinding);
    },
    /**
     * Gets the resource file URL.
     *
     * @returns {string} URL of the resource file.
     * @protected
     */
    _vGetResourceURL: function _vGetResourceURL()
    {
        return "json/resources.json";
    },
    /**
     * Registers the events which are serializable and can be shared between instances of the game.
     * @protected
     * @virtual
     */
    _vRegisterEvents: function _vRegisterEvents()
    {
        // TODO: Implement
    },
    /**
     * Initialises the spark engine application.
     *
     * @returns {Promise} Promise of the application initialisation.
     */
    initialise: function initialise()
    {
        return this._initialiseResourceManager()
            .then(this._vRegisterEvents.bind(this))
            .then(this._loadGameOptions.bind(this))
            .then(this._initialiseRenderer.bind(this))
            .then(this._initialiseAudio.bind(this))
            .then(this._initialiseBrowserHandlers.bind(this))
            .then(this._initialiseGameLogic.bind(this))
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
        this._render();
    },
    /**
     * Loads the game using configuration from game options.
     *
     * @returns  {Promise} Promise of loading a game.
     * @virtual
     */
    vLoadGame: function vLoadGame()
    {
        // TODO: Implement
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