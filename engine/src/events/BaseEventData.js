/**
 * Base class of the event data object.
 * Each event data object should inherit from this class.
 *
 * @param {number} [timeStamp] Time stamp of creation of the event.
 * @constructor
 * @class
 * @abstract
 */
function BaseEventData(timeStamp)
{
    this.m_timeStamp = timeStamp || 0;
}

BaseEventData.prototype =
{
    /**
     * Name of the event.
     * @type {string}
     */
    m_name: null,
    /**
     * Time stamp of the event data.
     * @type {number}
     */
    m_timeStamp: null,
    /**
     * Type of the event.
     * @type {number}
     */
    m_type: null,
    /**
     * Copies thee event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     * @virtual
     */
    vCopy: notImplemented,
    /**
     * Deserializes the event data from the data object.
     *
     * @param data Data of the event object.
     * @virtual
     */
    vDeserialize: empty,
    /**
     * Serializes the event data.
     *
     * @returns {*} Serialized event data.
     * @virtual
     */
    vSerialize: empty
};