/**
 * Class responsible for handling human interaction with the game.
 *
 * @param {IGameLogic} gameLogic Instance of the game logic.
 * @class
 * @implements IGameView
 */
function HumanView(gameLogic)
{
    this.m_gameLogic = gameLogic;
    this.m_type = GameViewType.Human;
}

HumanView.prototype =
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
     * Function used for resolving initialisation promise.
     * @type {Function}
     */
    m_initialisePromiseResolve: null,
    /**
     * Function used for rejecting initialisation promise.
     * @type {Function}
     */
    m_initialisePromiseReject: null,
    /**
     * Type of the game view.
     * @type {GameViewType}
     */
    m_type: null,
    /**
     * Destroys the game view and all its resources.
     */
    vDestroy: function vDestroy()
    {
        this.m_gameLogic.m_gameWorker.sendMessageToGame(new WorkerMessage_DestroyViewRendererRequest(this.m_id));
    },
    /**
     * Initialises the game view.
     *
     * @returns {Promise} Promise of view initialisation.
     */
    vInitialise: function vInitialise()
    {
        return new Promise(function (resolve, reject)
            {
                this.m_initialisePromiseReject = reject;
                this.m_initialisePromiseResolve = resolve;
                this.m_gameLogic.m_gameWorker.sendMessageToGame(new WorkerMessage_CreateViewRendererRequest(this.m_id, this.m_type));
            }.bind(this))
            .then(function ()
            {
                this.m_initialisePromiseReject = null;
                this.m_initialisePromiseResolve = null;
            }.bind(this));
    },
    /**
     * Loads the game.
     *
     * @return {Promise} Promise of loading a game.
     */
    vLoadGame: function vLoadGame()
    {
        return Promise.resolve();
    },
    /**
     * Called when the view has been attached to the specified actor.
     *
     * @param {number} gameViewId ID of the game view (assigned by the logic).
     * @param {number} actorId ID of the assigned actor.
     */
    vOnAttach: function vOnAttach(gameViewId, actorId)
    {
        this.m_actorId = actorId;
        this.m_id = gameViewId;
    },
    /**
     * Called when the renderer for the view was created.
     */
    vOnRendererCreated: function vOnRendererCreated()
    {
        this.m_initialisePromiseResolve();
    },
    /**
     * Performs updating of the game view logic.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {

    }
};