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
     * Handler to the Hammer.js.
     * @type {Manager}
     */
    m_hammer: null,
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
     * Called when the user ended panning.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPanEnd: function _vOnPanEnd(e)
    {
    },
    /**
     * Called when the user moved the finger when panning.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPanMove: function _vOnPanMove(e)
    {
    },
    /**
     * Called when the user started panning.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPanStart: function _vOnPanStart(e)
    {
    },
    /**
     * Called when the user ended pinching.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPinchEnd: function _vOnPinchEnd(e)
    {
    },
    /**
     * Called when the user moved the finger when pinching.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPinchMove: function _vOnPinchMove(e)
    {
    },
    /**
     * Called when the user started pinching.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPinchStart: function _vOnPinchStart(e)
    {
    },
    /**
     * Called when the screen was pressed for a certain amount of time.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPress: function _vOnPress(e)
    {
    },
    /**
     * Called when the screen was tapped.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @protected
     * @virtual
     */
    _vOnTap: function _vOnTap(e)
    {
    },
    /**
     * Destroys the game view and all its resources.
     */
    vDestroy: function vDestroy()
    {
        this.m_hammer.destroy();
    },
    /**
     * Initialises the game view.
     *
     * @returns {Promise} Promise of view initialisation.
     */
    vInitialise: function vInitialise()
    {
        this.m_hammer = new Hammer(document.documentElement)
            .on("panend", this._vOnPanEnd.bind(this))
            .on("panmove", this._vOnPanMove.bind(this))
            .on("panstart", this._vOnPanStart.bind(this))
            .on("pinchend", this._vOnPinchEnd.bind(this))
            .on("pinchmove", this._vOnPinchMove.bind(this))
            .on("pinchstart", this._vOnPinchStart.bind(this))
            .on("press", this._vOnPress.bind(this))
            .on("tap", this._vOnTap.bind(this));

        // TODO: Enable pinching - it is not enabled by default!

        return Promise.resolve();
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
     * Called when the rendering device was lost.
     */
    vOnDeviceLost: function vOnDeviceLost()
    {
        // TODO: Implement...
    },
    /**
     * Called when the rendering device was restored.
     */
    vOnDeviceRestored: function vOnDeviceRestored()
    {
        // TODO: Implement...
    },
    /**
     * Called when the game requested this view to be rendered.
     *
     * @param {GameTime} gameTime Time of the game at the time of rendering.
     */
    vOnRender: function vOnRender(gameTime)
    {
        // TODO: Implement...
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