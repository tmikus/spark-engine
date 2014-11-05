/**
 * Creates instance of an event which informs that the device was lost.
 *
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_DeviceLost()
{
    BaseEventData.apply(this, []);

    this.m_name = "EventData_DeviceLost";
    this.m_type = EventData_DeviceLost.s_type;
}

EventData_DeviceLost.s_type = 0xdda1c1ec;

EventData_DeviceLost.prototype = Class.extend(BaseEventData,
{
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_DeviceLost();
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