/**
 * Instance of the empty function - this function does nothing.
 */
function empty()
{
}

/**
 * Function used as a stub for not implemented method.
 */
function notImplemented()
{
    SE_FATAL("Called not implemented method!");
    throw "Not implemented!";
}

/**
 * Number of the event queues to create.
 * Should be greater than 1 to avoid constant looping of events.
 *
 * @type {number} Number of event queues to create.
 */
const EVENT_QUEUES_NUMBER = 2;

/**
 * Constant defining infinite time of the event update loop.
 *
 * @type {number}
 */
const EVENT_INFINITE_UPDATE = 0xFFFFFFF;

/**
 * Variable defining invalid Actor ID.
 * @type {number}
 */
const INVALID_ACTOR_ID = 0;

/**
 * Definition of the invalid game view ID.
 * @type {number}
 */
const INVALID_GAME_VIEW_ID = 0;

/**
 * Constant for converting from degrees to radians.
 * Just multiply by it and you'll get a value.
 * @type {number}
 */
const DEGREES_TO_RADIANS = Math.PI / 180;

/**
 * Constant for converting from radians to degrees.
 * Just multiply by it and you'll get a value.
 * @type {number}
 */
const RADIANS_TO_DEGREES = 180 / Math.PI;