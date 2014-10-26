/**
 * Creates instance of an event.
 *
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_Test()
{
    BaseEventData.apply(this, []);

    this.m_name = "EventData_Test";
    this.m_type = EventData_Test.s_type;
}

EventData_Test.s_type = 0xfb4d0403;

EventData_Test.prototype = Class.extend(BaseEventData,
{
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_Test();
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
        return { };
    }
});