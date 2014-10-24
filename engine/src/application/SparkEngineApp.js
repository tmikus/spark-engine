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

}

SparkEngineApp.prototype =
{
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
     * Initialises the event service.
     *
     * @returns {Promise} Promise of initialisation of event service.
     * @protected
     */
    _initialiseEventService: function _initialiseEventService()
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
        // TODO: Implement
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
     * Renders the current frame and schedules new frame to be rendered.
     * @protected
     */
    _render: function _render()
    {
        // TODO: Implement
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
     * Called after the initialisation is done.
     * @protected
     * @virtual
     */
    _vPostInitialise: function _vPostInitialise()
    {
        // TODO: Implement
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
            .then(this._initialiseEventService.bind(this))
            .then(this._vRegisterEvents.bind(this))
            .then(this._loadGameOptions.bind(this))
            .then(this._initialiseRenderer())
            .then(this._initialiseAudio())
            .then(this._initialiseBrowserHandlers())
            .then(this._initialiseGameLogic())
            .then(function ()
            {
                SE_INFO("All initialised.");
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
        // TODO: Implement
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
    }
};