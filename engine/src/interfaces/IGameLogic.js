/**
 * Interface for the game logic.
 * Classes implementing it are responsible for controlling the logic of the game.
 *
 * @param {SparkEngineApp} game Instance of the game.
 * @interface
 */
function IGameLogic(game)
{
}

IGameLogic.prototype =
{
    /**
     * Instance of the game to which this game logic belongs.
     * @type {SparkEngineApp}
     */
    m_game: null,
    /**
     * Array of game views added to this game logic.
     * @type {IGameView[]}
     */
    m_gameViews: null,
    /**
     * Adds a view to the game logic class.
     *
     * @param {IGameView} gameView Instance of the view to add.
     * @param {number} [actorId=INVALID_ACTOR_ID] ID of the actor to assign with the view.
     */
    vAddView: notImplemented,
    /**
     * Changes the state of the game logic.
     *
     * @param {number} state State to which switch.
     */
    vChangeState: notImplemented,
    /**
     * Creates the actor from specified resource.
     *
     * @param {string} actorResource Name of the actor resource.
     * @param {*} [overrides] Overrides for the actor.
     * @param {THREE.Matrix4} [initialTransform] Initial transform for the actor.
     * @param {number} [serverActorId] ID of the actor from the server.
     * @returns {Promise} Promise of creation of the actor.
     */
    vCreateActor: notImplemented,
    /**
     * Destroys the actor with specified ID.
     *
     * @param {number} actorId ID of the actor to destroy.
     */
    vDestroyActor: notImplemented,
    /**
     * Gets the actor with specified ID.
     *
     * @param {number} actorId ID of the actor to get.
     * @returns {Actor} Instance of the actor; null if not found.
     */
    vGetActor: notImplemented,
    /**
     * Gets actors with the specified type name.
     *
     * @param {string} type Name of the type.
     * @returns {Actor[]}
     */
    vGetActorsByType: notImplemented,
    /**
     * Initialises the game logic.
     *
     * @returns {Promise} Promise of initialising the game logic.
     */
    vInitialise: notImplemented,
    /**
     * Loads the game from specified resource and fills the scene with the actors from it.
     *
     * @param {string} levelResource Name of the level resource to load.
     * @returns {Promise} Promise of loading the level.
     */
    vLoadGame: notImplemented,
    /**
     * Called when the game is being loaded.
     * Developers can perform additional loading here.
     *
     * @param {Level} level Instance of the level.
     * @returns {Promise} Promise of loading of the game.
     */
    vLoadGameDelegate: notImplemented,
    /**
     * Modifies existing actor with specified data.
     *
     * @param {number} actorId ID of the actor to modify.
     * @param {*} overrides Changes to make to the actor.
     * @returns {Promise} Promise of modifying actor.
     */
    vModifyActor: notImplemented,
    /**
     * Performs updating of the game logic.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    vOnUpdate: notImplemented,
    /**
     * Removes the game view from the game logic.
     *
     * @param {IGameView} gameView Instance of the game view to remove.
     */
    vRemoveView: notImplemented
};