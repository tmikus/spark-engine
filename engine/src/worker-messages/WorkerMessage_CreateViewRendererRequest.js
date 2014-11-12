/**
 * Worker message responsible for requesting creation of a view renderer.
 *
 * @param {number} viewId ID of the view to create.
 * @param {GameViewType} viewType Type of the game view to create.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_CreateViewRendererRequest(viewId, viewType)
{
    this.m_type = WorkerMessage_CreateViewRendererRequest.s_type;

    this.m_viewId = viewId;
    this.m_viewType = viewType;
}

WorkerMessage_CreateViewRendererRequest.s_type = 0x32f3276f;

WorkerMessage_CreateViewRendererRequest.prototype =
{
    /**
     * Type of the message.
     * @type {number}
     */
    m_type: null,
    /**
     * ID of the view to create.
     * @type {number}
     */
    m_viewId: INVALID_GAME_VIEW_ID,
    /**
     * Type of the view to create.
     * @type {GameViewType}
     */
    m_viewType: null
};