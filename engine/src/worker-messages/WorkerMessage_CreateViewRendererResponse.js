/**
 * Worker message responsible for response of creation of a view renderer.
 *
 * @param {number} viewId ID of the view to create.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_CreateViewRendererResponse(viewId)
{
    this.m_type = WorkerMessage_CreateViewRendererResponse.s_type;

    this.m_viewId = viewId;
}

WorkerMessage_CreateViewRendererResponse.s_type = 0x090a5397;

WorkerMessage_CreateViewRendererResponse.prototype =
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