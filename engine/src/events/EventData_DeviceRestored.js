/**
 * Creates instance of an event which informs that the device was restored.
 *
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_DeviceRestored()
{
    BaseEventData.apply(this, []);

    this.m_name = "EventData_DeviceRestored";
    this.m_type = EventData_DeviceRestored.s_type;
}

EventData_DeviceRestored.s_type = 0x27224b1c;

EventData_DeviceRestored.prototype = Class.extend(BaseEventData,
{
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_DeviceRestored();
    },
    /**
     * Deserializes the event data from the data object.
     *
     * @param {*} data Data of the event object.
     */
    vDeserialize: function vDeserialize(data)
    {
    },
    /**
     * Serializes the event data.
     *
     * @returns {*} Serialized event data.
     */
    vSerialize: function vSerialize()
    {
        return {};
    }
});