/**
 * Creates instance of an event which informs that the actor was created.
 *
 * @param {number} actorId ID of the actor.
 * @param {number} [parentActorId] ID of the parent actor to which this actor must be added.
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_CreateActor(actorId, parentActorId)
{
    BaseEventData.apply(this, []);

    this.m_actorId = actorId;
    this.m_parentActorId = parentActorId || null;
    this.m_name = "EventData_CreateActor";
    this.m_type = EventData_CreateActor.s_type;
}

EventData_CreateActor.s_type = 0x096eb6ac;

EventData_CreateActor.prototype = Class.extend(BaseEventData,
{
    /**
     * ID of the created actor.
     * @type {number}
     */
    m_actorId: null,
    /**
     * ID of the parent actor to which this actor must be added.
     * @type {number}
     */
    m_parentActorId: null,
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_CreateActor(this.m_actorId, this.m_parentActorId);
    },
    /**
     * Deserializes the event data from the data object.
     *
     * @param {*} data Data of the event object.
     */
    vDeserialize: function vDeserialize(data)
    {
        this.m_actorId = data.actorId;
        this.m_parentActorId = data.parentActorId;
    },
    /**
     * Serializes the event data.
     *
     * @returns {*} Serialized event data.
     */
    vSerialize: function vSerialize()
    {
        return {
            actorId: this.m_actorId,
            parentActorId: this.m_parentActorId
        };
    }
});