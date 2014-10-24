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
     * Initialises the resource manager.
     *
     * @returns {Promise} Promise of initialisation of resource manager.
     * @protected
     */
    _initialiseResourceManager: function _initialiseResourceManager()
    {
        // TODO: Implement
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
     * Registers the events which are serializable and can be shared between instances of the game.
     * @protected
     * @virtual
     */
    _vRegisterEvents: function _vRegisterEvents()
    {

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
            .then(this._initialiseGameLogic())
            .then(function ()
            {
                SE_INFO("All initialised.");
            })
            ["catch"](function()
            {
                SE_FATAL("Game worker could not be initialised.");
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