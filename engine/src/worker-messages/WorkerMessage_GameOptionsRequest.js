/**
 * Worker message responsible for requesting game options.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_GameOptionsRequest()
{
    this.m_type = WorkerMessage_GameOptionsRequest.s_type;
}

WorkerMessage_GameOptionsRequest.s_type = 0x798a1d63;

WorkerMessage_GameOptionsRequest.prototype =
{
    /**
     * Type of the message.
     * @type {number}
     */
    m_type: null
};