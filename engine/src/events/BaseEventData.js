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
     * Time stamp of the event data.
     * @type {number}
     */
    m_timeStamp: null,
    /**
     * Copies thee event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    copy: notImplemented,
    /**
     * Deserializes the event data from the data object.
     *
     * @param data Data of the event object.
     */
    deserialize: empty,
    /**
     * Gets the type of the event.
     *
     * @returns {number} Type of the event.
     */
    getType: notImplemented,
    /**
     * Gets the name of the event.
     *
     * @returns {string} Name of the event.
     */
    getName: notImplemented,
    /**
     * Gets the time stamp of the creation of event.
     *
     * @return {number} Time stamp of the creation of event.
     */
    getTimeStamp: function getTimeStamp()
    {
        return this.m_timeStamp;
    },
    /**
     * Serializes the event data.
     *
     * @returns {*} Serialized event data.
     */
    serialize: empty
};