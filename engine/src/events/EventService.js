/**
 * Creates instance of the event manager.
 * Stores its name and if the 'setAsGlobal' is true - it sets it as a global event manager.
 *
 * @param {string} name Name of the event manager.
 * @param {boolean} setAsGlobal Should the event manager be set as global?
 * @constructor
 */
function EventService(name, setAsGlobal)
{
    this.m_eventListenersMap = {};
    this.m_eventQueues = new Array(EVENT_QUEUES_NUMBER);
    this.m_name = name;

    // Initializing queues
    var queues = this.m_eventQueues;
    for (var queueIndex = 0; queueIndex < EVENT_QUEUES_NUMBER; queueIndex++)
    {
        queues[queueIndex] = []
    }

    //if (setAsGlobal)
    //{
    //    if (g_eventManager)
    //    {
    //        SE_ERROR("Global instance of the event manager already exists!");
    //    }
    //    g_eventManager = this;
    //}
}

///**
// * Gets the global event manager.
// *
// * @returns {EventService} Global instance of the event manager.
// */
//EventService.get = function EventService_get()
//{
//    return g_eventManager;
//};

EventService.prototype =
{
    /**
     * Number of the active queue.
     * @type {number}
     */
    m_activeQueueNumber: 0,
    /**
     * Map of event types and event constructors.
     * @type {*}
     */
    m_eventConstructors: {},
    /**
     * Map of the event listeners.
     * @type {*}
     */
    m_eventListenersMap: null,
    /**
     * Array of the event queues.
     * @type {Array}
     */
    m_eventQueues: null,
    /**
     * Name of the event manager.
     * @type {string}
     */
    m_name: null,
    /**
     * Aborts the event with specified name.
     *
     * @param {number} eventType Name of the event to abort.
     * @param {boolean} allOfType True if all events of specified type should be aborted.
     * @returns {boolean} Has any event been deleted.
     */
    abortEvent: function abortEvent(eventType, allOfType)
    {
        var activeQueue = this.m_eventQueues[this.m_activeQueueNumber];
        var activeQueueLength = activeQueue.length;
        var success = false;

        for (var eventIndex = 0; eventIndex < activeQueueLength; eventIndex++)
        {
            if (activeQueue[eventIndex].m_type == eventType)
            {
                activeQueue.splice(eventIndex--, 1);
                activeQueueLength--;
                success = true;

                if (!allOfType)
                    break;
            }
        }

        return success;
    },
    /**
     * Adds the event listener to the event manager.
     *
     * @param {number} eventType Name of the event to which subscribe.
     * @param {Function} listenerDelegate Listener delegate function to add.
     * @returns {boolean} True if added; otherwise false.
     */
    addEventListener: function addEventListener(eventType, listenerDelegate)
    {
        var eventListeners = this.m_eventListenersMap[eventType];

        if (eventListeners === undefined)
        {
            this.m_eventListenersMap[eventType] = [listenerDelegate];
        }
        else if (eventListeners.indexOf(listenerDelegate) != -1)
        {
            SE_LOG("Event", "Event listener already registered for type: " + eventType.toString(16));
            return false;
        }
        else
        {
            eventListeners.push(listenerDelegate);
        }

        return true;
    },
    /**
     * Creates instance of the event with specified type.
     *
     * @param {number} eventType Type of the event to create.
     * @returns {BaseEventData} Instance of the created event.
     */
    createEvent: function createEvent(eventType)
    {
        var eventCtor = this.m_eventConstructors[eventType];

        if (!eventCtor)
        {
            SE_ERROR("Could not create event with the type: " + eventType);
            return null;
        }

        return new eventCtor();
    },
    /**
     * Deserializes the event from the data object.
     *
     * @param {{type: number, data: * }} eventData Event data.
     * @returns {BaseEventData} Instance of the event.
     */
    deserializeEvent: function deserializeEvent(eventData)
    {
        var event = this.createEvent(eventData.type);

        if (!event)
        {
            SE_ERROR("Could not deserialize the event.");
            return null;
        }

        event.deserialize(eventData.data);

        return event;
    },
    /**
     * Queues the event on the next queue.
     * @param {BaseEventData} eventData Event to queue
     */
    queueEvent: function queueEvent(eventData)
    {
        // Find listeners for the name of event.
        var listeners = this.m_eventListenersMap[eventData.m_type];

        // First - check if anyone is listening for this type of the event.
        if (listeners === undefined || listeners.length == 0)
        {
            return false;
        }

        // Push the event data.
        this.m_eventQueues[this.m_activeQueueNumber].push(eventData);
    },
    /**
     * Registers the type of the event inside the factory.
     *
     * @param {number} eventType Type of the event to register.
     * @param {Function} constructorFunction Constructor function of the event.
     */
    registerEvent: function registerEvent(eventType, constructorFunction)
    {
        if (this.m_eventConstructors[eventType])
        {
            SE_WARNING("Event for the type '" + eventType + "' is already registered!");
            return;
        }

        this.m_eventConstructors[eventType] = constructorFunction;
    },
    /**
     * Removes the event listener from the specified event name.
     *
     * @param {number} eventType Event name from which remove event listener.
     * @param {Function} listenerDelegate Listener delegate to remove.
     */
    removeEventListener: function removeEventListener(eventType, listenerDelegate)
    {
        var eventListeners = this.m_eventListenersMap[eventType];

        // Are there any listeners for that type?
        if (eventListeners !== undefined && eventListeners.length > 0)
        {
            // Find index of the event listener.
            var indexOfListenerDelegate = eventListeners.indexOf(listenerDelegate);

            // Is this listener added?
            if (indexOfListenerDelegate != -1)
            {
                eventListeners.splice(indexOfListenerDelegate, 1);
                return true;
            }
        }

        SE_LOG("Event", "Event listener was not found.");

        return false;
    },
    /**
     * Serializes the event onto a data object.
     *
     * @param {BaseEventData} event Event to serialize.
     * @returns {{data: *, type: (number|*)}} Event data object.
     */
    serializeEvent: function serializeEvent(event)
    {
        return {
            data: event.vSerialize(),
            type: event.m_type
        };
    },
    /**
     * Immediately triggers the event for specified name.
     *
     * @param {BaseEventData} eventData Instance of the event to trigger.
     * @returns {boolean} True if successfully triggered event (anyone was listening to it); otherwise false.
     */
    triggerEvent: function triggerEvent(eventData)
    {
        // Getting event listeners for that type...
        var eventListeners = this.m_eventListenersMap[eventData.m_type];

        // Is there any listener waiting for that event?
        if (eventListeners !== undefined)
        {
            var eventListenersLength = eventListeners.length;

            for (var index = 0; index < eventListenersLength; index++)
            {
                eventListeners[index](eventData);
            }

            return true;
        }

        return false;
    },
    /**
     * Updates the event manager.
     * Causes the events to be processed in a queue but obeying the maximum update time.
     *
     * @param {number} currentTime Current time of the game.
     * @param {number} maxUpdateTime Maximum game update time. By default EVENT_INFINITE_UPDATE.
     * @returns {boolean} Has the update flushed the event list.
     */
    update: function update(currentTime, maxUpdateTime)
    {
        if (maxUpdateTime === undefined)
        {
            maxUpdateTime = EVENT_INFINITE_UPDATE;
        }

        // Getting current and max time of execution
        var maxTime = (maxUpdateTime == EVENT_INFINITE_UPDATE) ? EVENT_INFINITE_UPDATE : currentTime + maxUpdateTime;

        // Storing current queue number and advancing pointer to the next.
        var currentQueueNumber = this.m_activeQueueNumber;
        this.m_activeQueueNumber = (currentQueueNumber + 1) % EVENT_QUEUES_NUMBER;

        // Clearing next queue
        this.m_eventQueues[this.m_activeQueueNumber] = [];

        // Getting current queue
        var currentQueue = this.m_eventQueues[currentQueueNumber];

        // Iterate over the queue until is empty.
        while (currentQueue.length > 0)
        {
            // Get the first event.
            var eventData = currentQueue.shift();

            // Get event listeners for the type
            var eventListeners = this.m_eventListenersMap[eventData.m_type];

            // Is there any listener?
            if (eventListeners !== undefined && eventListeners.length > 0)
            {
                var eventListenersLength = eventListeners.length;

                // Iterate over those listeners and call them.
                for (var index = 0; index < eventListenersLength; index++)
                {
                    eventListeners[index](eventData);
                }
            }

            // Checking the time of execution
            currentTime = performance.now();
            if (currentTime >= maxTime)
                break;
        }

        // Check if the queue is flushed
        var currentQueueLength = currentQueue.length;
        var queueFlushed = currentQueueLength == 0;

        // IF not move the events to the front of the next queue.
        if (!queueFlushed)
        {
            var nextQueue = this.m_eventQueues[this.m_activeQueueNumber];
            for (var eventIndex = 0; eventIndex < currentQueueLength; eventIndex++)
            {
                nextQueue.unshift(currentQueue.pop());
            }
        }

        return queueFlushed;
    }
};