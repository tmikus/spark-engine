/**
 * Base class for the script that manipulates the actor.
 *
 * @param {Actor} actor Instance of the actor.
 * @constructor
 * @class
 */
function BaseActorScript(actor)
{
    this.m_actor = actor;
}

BaseActorScript.prototype =
{
    /**
     * Actor to which this script is assigned.
     * @type {Actor}
     */
    m_actor: null,
    /**
     * Adds the event listener to the event manager.
     *
     * @param {number} eventType Name of the event to which subscribe.
     * @param {Function} listenerDelegate Listener delegate function to add.
     * @returns {boolean} True if added; otherwise false.
     */
    addEventListener: function addEventListener(eventType, listenerDelegate)
    {
        this.m_actor.m_game.m_eventService.addEventListener(eventType, listenerDelegate);
    },
    /**
     * Creates a new actor and adds him to the scene.
     *
     * @param {string} actorResource Name of the actor's resource.
     * @param {number} [parentActorId] ID of the parent actor.
     * @returns {Promise} Promise of actor's creation.
     */
    createActor: function createActor(actorResource, parentActorId)
    {
        return this.m_actor.m_game.m_gameLogic.vCreateActor(actorResource, parentActorId)
    },
    /**
     * Destroys actor with specified ID.
     *
     * @param {number} actorId ID of the actor to destroy.
     */
    destroyActor: function destroyActor(actorId)
    {
        this.queueEvent(new EventData_RequestDestroyingActor(actorId));
    },
    /**
     * Gets actors with the specified type name.
     *
     * @param {string} type Name of the type.
     * @returns {Actor[]}
     */
    getActorsByType: function getActorsByType(type)
    {
        return this.m_actor.m_game.m_gameLogic.vGetActorsByType(type);
    },
    /**
     * Gets the component with specified name.
     *
     * @param {string} name Name of the component to get.
     * @returns {ActorComponent} Instance of the loaded component.
     */
    getComponentByName: function getComponentByName(name)
    {
        return this.m_actor.getComponentByName(name);
    },
    /**
     * Queues the event.
     *
     * @param {BaseEventData} eventData Event to queue.
     */
    queueEvent: function queueEvent(eventData)
    {
        this.m_actor.m_game.m_eventService.queueEvent(eventData);
    },
    /**
     * Removes the event listener from the specified event name.
     *
     * @param {number} eventType Event name from which remove event listener.
     * @param {Function} listenerDelegate Listener delegate to remove.
     */
    removeEventListener: function removeEventListener(eventType, listenerDelegate)
    {
        this.m_actor.m_game.m_eventService.removeEventListener(eventType, listenerDelegate);
    },
    /**
     * Triggers an event.
     *
     * @param {BaseEventData} eventData Event to queue.
     */
    triggerEvent: function triggerEvent(eventData)
    {
        this.m_actor.m_game.m_eventService.triggerEvent(eventData);
    },
    /**
     * Called when the script is requested to destroy.
     */
    vDestroy: function vDestroy()
    {
    },
    /**
     * Initialises the script.
     *
     * @returns {Promise} Promise of script's initialisation.
     */
    vInitialise: function vInitialise()
    {
        return Promise.resolve();
    },
    /**
     * Called every time game requests the logic to be updated.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
    },
    /**
     * Called after the script was initialised.
     */
    vPostInitialise: function vPostInitialise()
    {
    }
};