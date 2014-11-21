/**
 * Script responsible for moving ball
 *
 * @param {Actor} actor Instance of the actor.
 * @constructor
 * @class
 * @extends BaseActorScript
 */
function RotateIceCreamActorScript(actor)
{
    BaseActorScript.apply(this, arguments);
}

RotateIceCreamActorScript.prototype = Class.extend(BaseActorScript,
{
    /**
     * Speed in points/s.
     * @type {number}
     */
    m_speed: 30,
    /**
     * Transform component.
     * @type {TransformComponent}
     */
    m_transformComponent: null,
    /**
     * Called every time game requests the logic to be updated.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        this.m_transformComponent.m_rotation.y += gameTime.m_deltaTime * this.m_speed * DEGREES_TO_RADIANS;
    },
    /**
     * Called after the script was initialised.
     */
    vPostInitialise: function vPostInitialise()
    {
        this.m_transformComponent = this.m_actor.getComponentByName("TransformComponent");
    }
});

this.exports = RotateIceCreamActorScript;