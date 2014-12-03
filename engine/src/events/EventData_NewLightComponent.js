/**
 * Creates instance of an event telling game to create a new light object.
 *
 * @param {number} actorId ID of the actor.
 * @param {THREE.Object3D} sceneNode Instance of the created light object.
 * @constructor
 * @class
 * @extends {BaseEventData}
 */
function EventData_NewLightComponent(actorId, sceneNode)
{
    BaseEventData.apply(this, []);

    this.m_name = "EventData_NewLightComponent";
    this.m_type = EventData_NewLightComponent.s_type;

    this.m_actorId = actorId ? actorId : INVALID_ACTOR_ID;
    this.m_sceneNode = sceneNode;
}

EventData_NewLightComponent.s_type = 0xe1f4d8e7;

EventData_NewLightComponent.prototype = Class.extend(BaseEventData,
{
    /**
     * ID of the actor.
     * @type {number}
     */
    m_actorId: null,
    /**
     * Instance of the scene node.
     * @type {THREE.Object3D}
     */
    m_sceneNode: null,
    /**
     * Copies the event data object onto a new object.
     * @returns {BaseEventData} New event data object.
     */
    vCopy: function vCopy()
    {
        return new EventData_NewLightComponent(this.m_actorId, this.m_sceneNode);
    },
    /**
     * Deserializes the event data from the data object.
     *
     * @param {{actorId: number}} data Data of the event object.
     */
    vDeserialize: function vDeserialize(data)
    {
        var message = "The EventData_NewLightComponent event should not be de-serialized!";
        SE_ERROR(message);
        throw message;
    },
    /**
     * Serializes the event data.
     *
     * @returns {*} Serialized event data.
     */
    vSerialize: function vSerialize()
    {
        var message = "The EventData_NewLightComponent event should not be serialized!";
        SE_ERROR(message);
        throw message;
    }
});