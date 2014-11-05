/**
 * Worker message responsible triggering an event inside the game logic.
 *
 * @param {number} eventType ID of the event to trigger.
 * @param {*} data Event data.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_TriggerEvent(eventType, data)
{
    this.m_data = data;
    this.m_eventType = eventType;
    this.m_type = WorkerMessage_TriggerEvent.s_type;
}

WorkerMessage_TriggerEvent.s_type = 0x2c43ef6d;

WorkerMessage_TriggerEvent.prototype =
{
    /**
     * Data of the event.
     * @type {*}
     */
    m_data: null,
    /**
     * ID of hte event to trigger.
     * @type {number}
     */
    m_eventType: null,
    /**
     * Type of the message.
     * @type {number}
     */
    m_type: null
};