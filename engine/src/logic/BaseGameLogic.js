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
    this.m_gameWorker = gameWorker;
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
     * ID of the currently used game view ID.
     * New views will have ID higher than this.
     * @type {number}
     */
    m_currentGameViewId: INVALID_GAME_VIEW_ID,
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
     * Called when the level resource was loaded.
     *
     * @param {*} level Instance of the level resource.
     * @protected
     * @virtual
     */
    _vOnLevelResourceLoaded: function _vOnLevelResourceLoaded(level)
    {
        // TODO: Implement...
    },
    /**
     * Adds a view to the game logic class.
     *
     * @param {IGameView} gameView Instance of the view to add.
     * @param {number} [actorId=INVALID_ACTOR_ID] ID of the actor to assign with the view.
     */
    vAddView: function vAddView(gameView, actorId)
    {
        if (actorId == undefined)
        {
            actorId = INVALID_ACTOR_ID;
        }

        this.m_gameViews.push(gameView);
        gameView.vOnAttach(++this.m_currentGameViewId, actorId);
        gameView.vInitialise();
    },
    /**
     * Changes the state of the game logic.
     *
     * @param {number} state State to which switch.
     */
    vChangeState: function vChangeState(state)
    {

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
        return new Promise(autoResolvingPromise)
            .then(function ()
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
            }.bind(this));
    },
    /**
     * Loads the game from specified resource and fills the scene with the actors from it.
     *
     * @param {string} levelResource Name of the level resource to load.
     * @returns {Promise} Promise of loading the level.
     */
    vLoadGame: function vLoadGame(levelResource)
    {
        this.m_gameWorker.m_resourceManager.getResource(levelResource)
            .then(this._vOnLevelResourceLoaded.bind(this))
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

        return new Promise(autoRejectingPromise);
    },
    /**
     * Performs updating of the game logic.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        // TODO: Updating game state
        
        // TODO: Updating long running processes
        
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
        var gameViewIndex = this.m_gameViews.indexOf(gameView);
        if (gameViewIndex != -1)
        {
            gameView.vDestroy();
            this.m_gameViews.splice(gameViewIndex, 1);
        }
    }
};