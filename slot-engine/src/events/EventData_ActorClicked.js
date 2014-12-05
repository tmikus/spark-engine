/**
 * Creates instance of an event which informs that the actor was clicked.
 *
 * @param {number} actorId Id of the clicked actor.
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_ActorClicked(actorId)
{
    BaseEventData.apply(this, []);

    this.m_actorId = actorId;
    this.m_name = "EventData_ActorClicked";
    this.m_type = EventData_ActorClicked.s_type;
}

EventData_ActorClicked.s_type = 0xd929b304;

EventData_ActorClicked.prototype = Class.extend(BaseEventData,
{
    /**
     * ID of the clicked actor.
     * @type {number}
     */
    m_actorId: INVALID_ACTOR_ID,
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_ActorClicked(this.m_actorId);
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