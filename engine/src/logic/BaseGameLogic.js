/**
 * Base class for the game logic.
 *
 * @param {SparkEngineWorker} gameWorker Instance of the game worker.
 * @constructor
 * @class
 * @abstract
 */
function BaseGameLogic(gameWorker)
{
    this.m_actors = [];
    this.m_actorsMap = {};
    this.m_gameState = BaseGameState.Initialising;
    this.m_gameViews = [];
    this.m_gameWorker = gameWorker;
    this.m_humanViews = [];

    this.m_environmentLoadedBinding = this._vOnEnvironmentLoaded.bind(this);
}

BaseGameLogic.prototype =
{
    /**
     * Factory for the actors.
     * @type {ActorFactory}
     */
    m_actorFactory: null,
    /**
     * List of actors added to this logic.
     * @type {Actor[]}
     */
    m_actors: null,
    /**
     * Map of actors and their IDs.
     * @type {Object.<number, Actor>}
     */
    m_actorsMap: null,
    /**
     * Number of attached AI players.
     * @type {number}
     */
    m_attachedAiPlayers: 0,
    /**
     * Number of attached local players.
     * @type {number}
     */
    m_attachedLocalPlayers: 0,
    /**
     * Number of attached remote players.
     * @type {number}
     */
    m_attachedRemotePlayers: 0,
    /**
     * ID of the currently used game view ID.
     * New views will have ID higher than this.
     * @type {number}
     */
    m_currentGameViewId: INVALID_GAME_VIEW_ID,
    /**
     * Number of expected AI players.
     * @type {number}
     */
    m_expectedAiPlayers: 0,
    /**
     * Number of expected local players.
     * @type {number}
     */
    m_expectedLocalPlayers: 0,
    /**
     * Number of expected remote players.
     * @type {number}
     */
    m_expectedRemotePlayers: 0,
    /**
     * State of the game at this point.
     * @type {BaseGameState|number}
     */
    m_gameState: 0,
    /**
     * Array of game views added to this game logic.
     * @type {IGameView[]}
     */
    m_gameViews: null,
    /**
     * Instance of the game worker to which this game logic belongs.
     * @type {SparkEngineWorker}
     */
    m_gameWorker: null,
    /**
     * Array of human views added to this game logic.
     * @type {IGameView[]}
     */
    m_humanViews: null,
    /**
     * Instance of the level manager.
     * @type {LevelManager}
     */
    m_levelManager: null,
    /**
     * Number of players who finished loading the level.
     * @type {number}
     */
    m_loadedPlayers: 0,
    /**
     * Manager of the processes.
     * @type {ProcessManager}
     */
    m_processManager: null,
    /**
     * Initialises actor factory.
     * @private
     */
    _initialiseActorFactory: function _initialiseActorFactory()
    {
        try
        {
            SE_INFO("Initialising Actor Factory for Game Logic.");
            this.m_actorFactory = new ActorFactory(this.m_gameWorker);
        }
        catch (ex)
        {
            SE_ERROR("Initialisation of Actor Factory has failed.");
            throw ex;
        }
    },
    /**
     * Initialises level manager.
     *
     * @returns {Promise} Promise of initialising level manager.
     * @private
     */
    _initialiseLevelManager: function _initialiseLevelManager()
    {
        try
        {
            SE_INFO("Initialising Level Manager for Game Logic.");
            this.m_levelManager = new LevelManager(this.m_gameWorker);
            return this.m_levelManager.initialise();
        }
        catch (ex)
        {
            SE_ERROR("Initialisation of Level Manager has failed.");
            throw ex;
        }
    },
    /**
     * Initialises process manager.
     * @private
     */
    _initialiseProcessManager: function _initialiseProcessManager()
    {
        try
        {
            SE_INFO("Initialising Process Manager for Game Logic.");
            this.m_processManager = new ProcessManager();
        }
        catch (ex)
        {
            SE_ERROR("Initialisation of Process Manager has failed.");
            throw ex;
        }
    },
    /**
     * Called when the actor instance was created.
     *
     * @param {string} actorResource Name of the resource used for creating an actor.
     * @param {Actor} actor Instance of the actor.
     * @private
     */
    _onActorCreated: function _onActorCreated(actorResource, actor)
    {
        SE_INFO("Actor has been created: " + actorResource);

        this.m_actors.push(actor);
        this.m_actorsMap[actor.m_id] = actor;

        // TODO: Spawning event informing other clients that the actor was created.
        // Only for the game server.

        return actor;
    },
    /**
     * Called when the level was loaded.
     * @private
     */
    _onLevelLoaded: function _onLevelLoaded()
    {
        this.vChangeState(BaseGameState.WaitingForPlayersToLoadEnvironment);
    },
    /**
     * Processes the human views.
     *
     * @param {Level} level Instance of the level.
     * @returns {Promise} Promise of loading game on human views.
     * @private
     */
    _processHumanViews: function _processHumanViews(level)
    {
        var humanViews = this.m_humanViews;
        var humanViewsLength = humanViews.length;
        var humanViewLoadGamePromises = new Array(humanViewsLength);

        for (var humanViewIndex = 0; humanViewIndex < humanViewsLength; humanViewIndex++)
        {
            humanViewLoadGamePromises[humanViewIndex] = humanViews[humanViewIndex].vLoadGame(level);
        }

        return Promise.all(humanViewLoadGamePromises);
    },
    /**
     * Processes the post load scripts.
     *
     * @param {Level} level Instance of the level.
     * @returns {Promise} Promise of running post load scripts.
     * @private
     */
    _processPostLoadScripts: function _processPostLoadScripts(level)
    {
        var postLoadScript = level.m_scripts.postLoad;
        if (!postLoadScript)
            return null;

        SE_INFO("Level has post-load script. Running script: " + postLoadScript);
        return this.m_gameWorker.m_scriptManager.runScript(postLoadScript);
    },
    /**
     * Processes the pre-load scripts.
     *
     * @param {Level} level Instance of the level.
     * @returns {Promise} Promise of running pre load scripts.
     * @private
     */
    _processPreLoadScripts: function _processPreLoadScripts(level)
    {
        var preLoadScript = level.m_scripts.preLoad;
        if (!preLoadScript)
            return null;

        SE_INFO("Level has pre-load script. Running script: " + preLoadScript);
        return this.m_gameWorker.m_scriptManager.runScript(preLoadScript);
    },
    /**
     * Processes the static actors.
     *
     * @param {Level} level Instance of the level.
     * @returns {Promise} Promise of creating static actors.
     * @private
     */
    _processStaticActors: function _processStaticActors(level)
    {
        var staticActors = level.m_staticActors;
        var staticActorsLength = staticActors.length;
        var actorCreationPromises = new Array(staticActorsLength);

        for (var actorIndex = 0; actorIndex < staticActorsLength; actorIndex++)
        {
            var staticActor = staticActors[actorIndex];
            actorCreationPromises[actorIndex] = this.vCreateActor(
                staticActor.resourceName,
                staticActor.overrides,
                staticActor.initialTransform
            );
        }

        return Promise.all(actorCreationPromises);
    },
    /**
     * Method called when the environment was loaded.
     *
     * @param {EventData_EnvironmentLoaded} data Event data.
     * @protected
     * @virtual
     */
    _vOnEnvironmentLoaded: function _vOnEnvironmentLoaded(data)
    {
        this.m_loadedPlayers++;
    },
    /**
     * Called when the level resource was loaded.
     *
     * @param {Level} level Instance of the level resource.
     * @returns {Promise} Promise of initialising the level.
     * @protected
     * @virtual
     */
    _vOnLevelResourceLoaded: function _vOnLevelResourceLoaded(level)
    {
        return Promise.resolve()
            .then(this._processPreLoadScripts.bind(this, level))
            .then(this._processStaticActors.bind(this, level))
            .then(this._processHumanViews.bind(this, level))
            .then(this.vLoadGameDelegate.bind(this, level))
            .then(this._processPostLoadScripts.bind(this, level))
            .then(function ()
            {
                this.m_gameWorker.m_eventService.triggerEvent(new EventData_EnvironmentLoaded());
            }.bind(this))
            .catch(function ()
            {
                SE_ERROR("Initialisation of the level has failed.");
            });
    },
    /**
     * Adds a view to the game logic class.
     *
     * @param {IGameView} gameView Instance of the view to add.
     * @param {number} [actorId=INVALID_ACTOR_ID] ID of the actor to assign with the view.
     */
    vAddView: function vAddView(gameView, actorId)
    {
        var gameViewId = ++this.m_currentGameViewId;
        SE_INFO("Adding game view with type: " + gameView.m_type + " and id: " + gameViewId);

        if (actorId == undefined)
        {
            actorId = INVALID_ACTOR_ID;
        }

        this.m_gameViews.push(gameView);

        if (gameView.m_type == GameViewType.Human)
        {
            this.m_humanViews.push(gameView);
        }

        gameView.vOnAttach(gameViewId, actorId);
        gameView.vInitialise();

        // Increasing numbers of players for specific types of views
        switch (gameView.m_type)
        {
            case GameViewType.AI:
                this.m_attachedAiPlayers++;
                break;
            case GameViewType.Human:
                this.m_attachedLocalPlayers++;
                break;
            case GameViewType.Remote:
                this.m_attachedRemotePlayers++;
                break;
        }
    },
    /**
     * Changes the state of the game logic.
     *
     * @param {BaseGameState|number} state State to which switch.
     */
    vChangeState: function vChangeState(state)
    {
        SE_INFO("Changing game state to: " + state);

        this.m_gameState = state;

        switch (state)
        {
            case BaseGameState.WaitingForPlayers:
                // TODO: It must be changed in order to enable split screen
                this.m_expectedLocalPlayers = 1;

                // TODO: It must be changed in order to enable support for remote gaming
                this.m_expectedRemotePlayers = 0;

                // TODO: It must be changed in order to support AI.
                this.m_expectedAiPlayers = 0;
                break;

            case BaseGameState.LoadingGameEnvironment:
                this.m_gameWorker.vLoadGame();
                break;
        }
    },
    /**
     * Creates the actor from specified resource.
     *
     * @param {string} actorResource Name of the actor resource.
     * @param {*} [overrides] Overrides for the actor.
     * @param {THREE.Matrix4} [initialTransform] Initial transform for the actor.
     * @param {number} [serverActorId] ID of the actor from the server.
     * @returns {Promise} Promise of creation of the actor.
     */
    vCreateActor: function vCreateActor(actorResource, overrides, initialTransform, serverActorId)
    {
        SE_INFO("Creating actor from resource: " + actorResource);
        return this.m_actorFactory.createActor(actorResource, overrides, initialTransform, serverActorId)
            .then(this._onActorCreated.bind(this, actorResource))
            .catch(function ()
            {
                SE_ERROR("Could not create actor from resource: " + actorResource);
            });
    },
    /**
     * Destroys the actor with specified ID.
     *
     * @param {number} actorId ID of the actor to destroy.
     */
    vDestroyActor: function vDestroyActor(actorId)
    {
        SE_INFO("Destroying actor: " + actorId);
        this.m_gameWorker.m_eventService.triggerEvent(new EventData_DestroyActor(actorId));

        // Getting the actor
        var actor = this.m_actorsMap[actorId];

        // Does the actor exists?
        if (actor)
        {
            actor.destroy();
            this.m_actors.splice(this.m_actors.indexOf(actor), 1);
            delete this.m_actorsMap[actorId];
        }
        else
        {
            SE_WARNING("Could destroy the actor: " + actorId + ". Could not find the actor.");
        }
    },
    /**
     * Gets the actor with specified ID.
     *
     * @param {number} actorId ID of the actor to get.
     * @returns {Actor} Instance of the actor; null if not found.
     */
    vGetActor: function vGetActor(actorId)
    {
        return this.m_actorsMap[actorId] || null;
    },
    /**
     * Initialises the game logic.
     *
     * @returns {Promise} Promise of initialising the game logic.
     */
    vInitialise: function vInitialise()
    {
        this.m_gameWorker.m_eventService.addEventListener(EventData_EnvironmentLoaded.s_type, this.m_environmentLoadedBinding);

        return Promise.resolve()
            .then(this._initialiseActorFactory.bind(this))
            .then(this._initialiseProcessManager.bind(this))
            .then(this._initialiseLevelManager.bind(this));
    },
    /**
     * Loads the game from specified resource and fills the scene with the actors from it.
     *
     * @param {string} levelResource Name of the level resource to load.
     * @returns {Promise} Promise of loading the level.
     */
    vLoadGame: function vLoadGame(levelResource)
    {
        SE_INFO("Loading game level: " + levelResource);

        // TODO: Destroying previous level...

        return this.m_levelManager.loadLevel(levelResource)
            .then(this._vOnLevelResourceLoaded.bind(this))
            .then(this._onLevelLoaded.bind(this))
            .catch(function ()
            {
                SE_ERROR("Could not load level: " + levelResource);
            });
    },
    /**
     * Modifies existing actor with specified data.
     *
     * @param {number} actorId ID of the actor to modify.
     * @param {*} overrides Changes to make to the actor.
     * @returns {Promise} Promise of modifying actor.
     */
    vModifyActor: function vModifyActor(actorId, overrides)
    {
        var actor = this.m_actorsMap[actorId];

        if (actor)
        {
            return this.m_actorFactory.modifyActor(actor, overrides);
        }

        SE_WARNING("Could not modify actor with id: " + actorId + ". Actor does not exists.");

        return Promise.reject();
    },
    /**
     * Performs updating of the game logic.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        switch (this.m_gameState)
        {
            case BaseGameState.Initialising:
                this.vChangeState(BaseGameState.WaitingForPlayers);
                break;

            case BaseGameState.WaitingForPlayers:
                if (this.m_expectedLocalPlayers + this.m_expectedRemotePlayers == this.m_attachedLocalPlayers + this.m_attachedRemotePlayers)
                {
                    this.vChangeState(BaseGameState.LoadingGameEnvironment);
                }
                break;

            case BaseGameState.WaitingForPlayersToLoadEnvironment:
                if (this.m_expectedLocalPlayers + this.m_expectedRemotePlayers <= this.m_loadedPlayers)
                {
                    this.vChangeState(BaseGameState.SpawningPlayerActors);
                }
                break;

            case BaseGameState.SpawningPlayerActors:
                this.vChangeState(BaseGameState.Running);
                break;
        }

        this.m_processManager.updateProcesses(gameTime);
        
        // Updating all game views.
        var gameViews = this.m_gameViews;
        var gameViewsLength = gameViews.length;
        for (var gameViewIndex = 0; gameViewIndex < gameViewsLength; gameViewIndex++)
        {
            gameViews[gameViewIndex].vOnUpdate(gameTime);
        }
        
        // Updating game actors
        var actors = this.m_actors;
        var actorsLength = actors.length;
        for (var actorIndex = 0; actorIndex < actorsLength; actorIndex++)
        {
            actors[actorIndex].onUpdate(gameTime);
        }
    },
    /**
     * Removes the game view from the game logic.
     *
     * @param {IGameView} gameView Instance of the game view to remove.
     */
    vRemoveView: function vRemoveView(gameView)
    {
        SE_INFO("Removing game view with type: " + gameView.m_type + " and id: " + gameView.m_id);

        var gameViewIndex = this.m_gameViews.indexOf(gameView);
        if (gameViewIndex != -1)
        {
            gameView.vDestroy();

            if (gameView.m_type == GameViewType.Human)
            {
                this.m_humanViews.splice(this.m_humanViews.indexOf(gameView), 1);
            }

            this.m_gameViews.splice(gameViewIndex, 1);
        }
    }
};