/**
 * Script responsible for moving ball
 *
 * @param {Actor} actor Instance of the actor.
 * @constructor
 * @class
 * @extends BaseActorScript
 */
function LoadingScreenScript(actor)
{
    BaseActorScript.apply(this, arguments);
}

LoadingScreenScript.prototype = Class.extend(BaseActorScript,
{
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

this.exports = LoadingScreenScript;