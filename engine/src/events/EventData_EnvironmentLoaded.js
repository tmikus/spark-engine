/**
 * Creates instance of an event which informs that the environment was loaded.
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_EnvironmentLoaded()
{
    BaseEventData.apply(this, []);

    this.m_name = "EventData_EnvironmentLoaded";
    this.m_type = EventData_EnvironmentLoaded.s_type;
}

EventData_EnvironmentLoaded.s_type = 0xe221ee76;

EventData_EnvironmentLoaded.prototype = Class.extend(BaseEventData,
{
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_EnvironmentLoaded();
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