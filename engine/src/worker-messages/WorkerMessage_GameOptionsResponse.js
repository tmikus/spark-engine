/**
 * Worker message responsible for responding with loaded game options.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_GameOptionsResponse(options)
{
    this.m_options = options;
    this.m_type = WorkerMessage_GameOptionsResponse.s_type;
}

WorkerMessage_GameOptionsResponse.s_type = 0xa54a2c6d;

WorkerMessage_GameOptionsResponse.prototype =
{
    /**
     * Serialized version of game options.
     * @type {*}
     */
    m_options: null,
    /**
     * Type of the message.
     * @type {number}
     */
    m_type: null
};