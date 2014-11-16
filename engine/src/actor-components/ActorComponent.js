/**
 * Base class for every actor component there is in the game.
 * @constructor
 * @class
 * @abstract
 */
function ActorComponent()
{
    this._generateId();
}

/**
 * Gets unique identifier based on the name specified in the 'name' argument.
 *
 * @param {string} name Name to parse
 * @returns {number} Unique identifier.
 */
ActorComponent.GetIdFromName = function ActorComponent_GetIdFromName(name)
{
    // Relatively simple hash of arbitrary text string into a
    // 32-bit identifier Output value is
    // input-valid-deterministic, but no guarantees are made
    // about the uniqueness of the output per-input
    //
    // Input value is treated as lower-case to cut down on false
    // separations cause by human mistypes. Sure, it could be
    // construed as a programming error to mix up your cases, and
    // it cuts down on permutations, but in Real World Usage
    // making this text case-sensitive will likely just lead to
    // Pain and Suffering.
    //
    // This code lossely based upon the adler32 checksum by Mark
    // Adler and published as part of the zlib compression
    // library sources.

    // largest prime smaller than 65536
    var BASE = 65521;

    // NMAX is the largest n such that 255n(n+1)/2 +
    // (n+1)(BASE-1) <= 2^32-1
    var NMAX = 5552;

    var s1 = 0;
    name = name.toLowerCase();
    var nameLength = name.length;

    for (var namePointer = 0; namePointer < nameLength;)
    {
        var piece = nameLength < NMAX ? nameLength : NMAX;

        for (var index = 0; index < piece; index++)
        {
            s1 += name.charCodeAt(namePointer + index);
        }

        namePointer += piece;

        s1 %= BASE;
    }

    return (s1 << 16) | s1;
};

ActorComponent.prototype =
{
    /**
     * ID of the actor component.
     * JUST FOR INTERNAL USE!
     * @type {number}
     */
    m_id: null,
    /**
     * Actor to which this component belongs.
     * @type {Actor}
     */
    m_owner: null,
    /**
     * Generates ID of the component.
     */
    _generateId: function _generateId()
    {
        this.m_id = ActorComponent.GetIdFromName(this.vGetName());
    },
    /**
     * Destroys the actor component.
     */
    vDestroy: function vDestroy()
    {
    },
    /**
     * Gets the name of the component.
     * @returns {string} Name of the component.
     */
    vGetName: notImplemented,
    /**
     * Initialises the Actor Component.
     *
     * @param {*} data Data of the component.
     * @returns {Promise} Promise of initialisation of component
     */
    vInitialise: notImplemented,
    /**
     * Called when the component has been changed.
     */
    vOnChanged: function vOnChanged()
    {
    },
    /**
     * Called when the component is requested to update.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
    },
    /**
     * Called after the initialisation has been completed.
     */
    vPostInitialise: function vPostInitialise()
    {
    }
};