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
     * Instance of the game time.
     * Used for tracking the game time from one update to another.
     * @type {GameTime}
     */
    m_gameTime: null,
    /**
     * Instance of the resource manager.
     * @type {WorkerResourceManager}
     */
    m_resourceManager: null,
    /**
     * ID of interval used for updating game logic.
     * @type {number}
     */
    m_updateLoopInterval: null,
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
            .catch(function ()
            {
                SE_ERROR("Could not initialise Game Logic.");
            });
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
        return this.m_resourceManager.getResource("test.json")
            .then(function (data)
            {
                SE_INFO(data);
            });
        // TODO: Implement
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

            case WorkerMessage_TriggerEvent.s_type:
                this.m_eventService.processTriggerEventMessage(message.data);
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
        try
        {
            SE_INFO("Registering events.");

            var eventService = this.m_eventService;
            eventService.registerEvent(EventData_DeviceLost.s_type, EventData_DeviceLost);
            eventService.registerEvent(EventData_DeviceRestored.s_type, EventData_DeviceRestored);
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
        return this._initialiseCommunication()
            .then(this._initialiseGameTime.bind(this))
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
        SE_INFO("Starting game logic loop.");

        this._vOnUpdate();
        this.m_updateLoopInterval = setInterval(this._vOnUpdate.bind(this), 0);
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