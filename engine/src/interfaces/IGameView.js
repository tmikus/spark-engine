/**
 * Interface for the game view.
 * Game view is responsible for interfacing with certain type of player:
 * - Human player: sitting in front of the computer, mobile
 * - AI player: artificial intelligence residing in memory
 * - Network player: remote player connecting to the game
 *
 * @param {IGameLogic} gameLogic Instance of the game logic.
 * @interface
 */
function IGameView(gameLogic)
{
}

IGameView.prototype =
{
    /**
     * ID of the actor to which this view is bound.
     * @type {number}
     */
    m_actorId: INVALID_ACTOR_ID,
    /**
     * Instance of the game logic to which this view is added.
     * @type {IGameLogic}
     */
    m_gameLogic: null,
    /**
     * ID of the game view.
     * @type {number}
     */
    m_id: INVALID_GAME_VIEW_ID,
    /**
     * Type of the game view.
     * @type {GameViewType}
     */
    m_type: null,
    /**
     * Destroys the game view and all its resources.
     */
    vDestroy: notImplemented,
    /**
     * Initialises the game view.
     *
     * @returns {Promise} Promise of view initialisation.
     */
    vInitialise: notImplemented,
    /**
     * Loads the game.
     *
     * @return {Promise} Promise of loading a game.
     */
    vLoadGame: notImplemented,
    /**
     * Called when the view has been attached to the specified actor.
     *
     * @param {number} gameViewId ID of the game view (assigned by the logic).
     * @param {number} actorId ID of the assigned actor.
     */
    vOnAttach: notImplemented,
    /**
     * Called when the rendering device was lost.
     */
    vOnDeviceLost: notImplemented,
    /**
     * Called when the rendering device was restored.
     */
    vOnDeviceRestored: notImplemented,
    /**
     * Called when the game requested this view to be rendered.
     *
     * @param {GameTime} gameTime Time of the game at the time of rendering.
     */
    vOnRender: notImplemented,
    /**
     * Performs updating of the game view logic.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: notImplemented
};