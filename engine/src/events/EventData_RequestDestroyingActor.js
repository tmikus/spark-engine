/**
 * Creates instance of an event which requests the actor to be destroyed.
 *
 * @param {number} actorId ID of the actor.
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_RequestDestroyingActor(actorId)
{
    BaseEventData.apply(this, []);

    this.m_actorId = actorId;
    this.m_name = "EventData_RequestDestroyingActor";
    this.m_type = EventData_RequestDestroyingActor.s_type;
}

EventData_RequestDestroyingActor.s_type = 0x23d139c9;

EventData_RequestDestroyingActor.prototype = Class.extend(BaseEventData,
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
        return new EventData_RequestDestroyingActor(this.m_actorId);
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