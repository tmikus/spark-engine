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
     * Destroys the game view and all its resources.
     */
    vDestroy: notImplemented,
    /**
     * Gets the ID of the game view.
     *
     * @returns {number} ID of the game view.
     */
    vGetId: notImplemented,
    /**
     * Gets the type of the game view.
     *
     * @returns {GameViewType} Type of the game view.
     */
    vGetType: notImplemented,
    /**
     * Initialises the game view.
     *
     * @returns {promise} Promise of view initialisation.
     */
    vInitialise: notImplemented,
    /**
     * Called when the view has been attached to the specified actor.
     *
     * @param {number} gameViewId ID of the game view (assigned by the logic).
     * @param {number} actorId ID of the assigned actor.
     */
    vOnAttach: notImplemented,
    /**
     * Performs updating of the game view logic.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: notImplemented
};