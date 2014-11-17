/**
 * Script responsible for moving ball
 *
 * @param {Actor} actor Instance of the actor.
 * @constructor
 * @class
 * @extends BaseActorScript
 */
function MoveBallActorScript(actor)
{
    BaseActorScript.apply(this, arguments);
}

MoveBallActorScript.prototype = Class.extend(BaseActorScript,
{
    /**
     * Direction of the animation.
     * @type {number}
     */
    m_direction: 1,
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
        if (this.m_transformComponent.m_position.x > 200 || this.m_transformComponent.m_position.x < -200)
        {
            this.m_direction *= -1;
        }

        this.m_transformComponent.m_position.x += gameTime.m_deltaTime * this.m_speed * this.m_direction;
    },
    /**
     * Called after the script was initialised.
     */
    vPostInitialise: function vPostInitialise()
    {
        this.m_transformComponent = this.m_actor.getComponentByName("TransformComponent");
    }
});

this.exports = MoveBallActorScript;