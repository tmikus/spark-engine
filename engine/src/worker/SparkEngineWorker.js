/**
 * A class of the application built using Spark Engine.
 * This is a base class for every game.
 * Initialisation should be done in the extending class
 * @constructor
 * @class
 * @abstract
 */
function SparkEngineWorker()
{

}

SparkEngineWorker.prototype =
{
    /**
     * Instance of the resource manager.
     * @type {WorkerResourceManager}
     */
    m_resourceManager: null,
    /**
     * Initialises the communication with main thread.
     * @returns {Promise} Promise of initialisation.
     * @protected
     */
    _initialiseCommunication: function _initialiseCommunication()
    {
        return new Promise(function (resolve)
        {
            self.onmessage = this._vProcessApplicationMessage.bind(this);
            resolve();
        }.bind(this));
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
     * Initialises the resource manager.
     *
     * @returns {Promise} Promise of initialisation of resource manager.
     * @protected
     */
    _initialiseResourceManager: function _initialiseResourceManager()
    {
        try
        {
            SE_INFO("Initialising Worker Resource Manager.");
            this.m_resourceManager = new WorkerResourceManager(this);
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
        this.m_resourceManager.getResource("test.json")
            .then(function (data)
            {
                SE_INFO(data);
            });
        // TODO: Implement
    },
    /**
     * Processes the message received from the game.
     *
     * @param message Message received from the game.
     * @returns {boolean} Has the message been processed?
     * @protected
     * @virtual
     */
    _vProcessApplicationMessage: function _vProcessApplicationMessage(message)
    {
        switch (message.data.m_type)
        {
            case WorkerMessage_ResourceResponse.s_type:
                this.m_resourceManager.requestedResourceLoaded(message.data);
                break;

            default:
                return false;
        }

        return true;
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
        return this._initialiseCommunication()
            .then(this._initialiseResourceManager.bind(this))
            .then(this._initialiseEventService.bind(this))
            .then(this._vRegisterEvents.bind(this))
            .then(this._loadGameOptions.bind(this))
            .then(this._initialiseGameLogic())
            .then(function ()
            {
                SE_INFO("Game worker initialised.");
            })
            ["catch"](function()
            {
                SE_FATAL("Game worker could not be initialised.");
            });
    },
    /**
     * Sends a message to the game.
     *
     * @param {IWorkerMessage} message Message to send to game.
     */
    sendMessageToGame: function sendMessageToGame(message)
    {
        self.postMessage(message);
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