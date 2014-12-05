/**
 * Script responsible for showing game logo sprite.
 *
 * @param {Actor} actor Instance of the actor.
 * @constructor
 * @class
 * @extends BaseActorScript
 */
function LogoScript(actor)
{
    BaseActorScript.apply(this, arguments);
}

LogoScript.prototype = Class.extend(BaseActorScript,
{
    /**
     * Time passed since animation beginning.
     * @type {number}
     */
    m_timePassed: 0,
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
});

this.exports = LogoScript;