/**
 * Creates instance of an event informing that a render component was modified.
 *
 * @param {number} actorId ID of the actor.
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_ModifiedRenderComponent(actorId)
{
    BaseEventData.apply(this, []);

    this.m_name = "EventData_ModifiedRenderComponent";
    this.m_type = EventData_ModifiedRenderComponent.s_type;

    this.m_actorId = actorId;
}

EventData_ModifiedRenderComponent.s_type = 0x562a16af;

EventData_ModifiedRenderComponent.prototype = Class.extend(BaseEventData,
{
    /**
     * ID of the actor.
     * @type {number}
     */
    m_actorId: null,
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_ModifiedRenderComponent(this.m_actorId);
    },
    /**
     * Deserializes the event data from the data object.
     *
     * @param {{actorId: number}} data Data of the event object.
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