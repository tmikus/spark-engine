/**
 * Worker message responsible for requesting destruction of a view renderer.
 *
 * @param {number} viewId ID of the view to destroy.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_DestroyViewRendererRequest(viewId)
{
    this.m_type = WorkerMessage_DestroyViewRendererRequest.s_type;

    this.m_viewId = viewId;
}

WorkerMessage_DestroyViewRendererRequest.s_type = 0x9b22395e;

WorkerMessage_DestroyViewRendererRequest.prototype =
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
    m_viewId: INVALID_GAME_VIEW_ID
};