/**
 * Script responsible for moving ball
 *
 * @param {Actor} actor Instance of the actor.
 * @constructor
 * @class
 * @extends BaseActorScript
 */
function BallFactoryActorScript(actor)
{
    BaseActorScript.apply(this, arguments);
}

BallFactoryActorScript.prototype = Class.extend(BaseActorScript,
{
    m_balls: [],

    m_ballSpawnInterval: 3,

    m_maxBalls: 10,

    m_timeFromLastBallCreation: 0,
    /**
     * Called every time game requests the logic to be updated.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        // TODO: Remove balls after some time...
        if (this.m_balls.length == this.m_maxBalls)
            return;

        this.m_timeFromLastBallCreation += gameTime.m_deltaTime;

        if (this.m_timeFromLastBallCreation >= this.m_ballSpawnInterval)
        {
            SE_INFO("Spawning a new ball.");

            this.m_timeFromLastBallCreation = 0;

            this.createActor("actors/sphere-actor")
                .then(function (actor)
                {
                    this.m_balls.push(actor.m_id);
                }.bind(this));
        }
    },
    /**
     * Called after the script was initialised.
     */
    vPostInitialise: function vPostInitialise()
    {
    }
});

this.exports = BallFactoryActorScript;