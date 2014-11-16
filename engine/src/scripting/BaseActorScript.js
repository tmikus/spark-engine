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