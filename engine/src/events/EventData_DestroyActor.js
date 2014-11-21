/**
 * Creates instance of an event which informs that the actor was destroyed.
 *
 * @param {number} actorId ID of the actor.
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_DestroyActor(actorId)
{
    BaseEventData.apply(this, []);

    this.m_actorId = actorId;
    this.m_name = "EventData_DestroyActor";
    this.m_type = EventData_DestroyActor.s_type;
}

EventData_DestroyActor.s_type = 0x32b73a97;

EventData_DestroyActor.prototype = Class.extend(BaseEventData,
{
    /**
     * ID of the destroyed actor.
     * @type {number}
     */
    m_actorId: null,
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_DestroyActor(this.m_actorId);
    },
    /**
     * Deserializes the event data from the data object.
     *
     * @param {*} data Data of the event object.
     */
    vDeserialize: function vDeserialize(data)
    {
        this.m_actorId = data.actorId;
    },
    /**
     * Serializes the event data.
     *
     * @returns {*} Serialized event data.
     */
    vSerialize: function vSerialize()
    {
        return {
            actorId: this.m_actorId
        };
    }
});