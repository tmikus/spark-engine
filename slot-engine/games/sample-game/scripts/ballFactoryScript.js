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

    m_ballSpawnInterval: 1,

    m_maxBalls: 5,

    m_timeFromLastBallCreation: 0,
    /**
     * Called every time game requests the logic to be updated.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        this.m_timeFromLastBallCreation += gameTime.m_deltaTime;

        if (this.m_balls.length == this.m_maxBalls)
        {
            if (this.m_timeFromLastBallCreation >= this.m_ballSpawnInterval)
            {
                for (var ballIndex = 0; ballIndex < this.m_balls.length; ballIndex++)
                {
                    this.destroyActor(this.m_balls[ballIndex]);
                }

                this.m_balls = [];
            }

            return;
        }

        if (this.m_timeFromLastBallCreation >= this.m_ballSpawnInterval)
        {
            SE_INFO("Spawning a new ball.");

            this.m_timeFromLastBallCreation = 0;

            this.createActor("actors/sphere-actor", this.m_actor.m_id)
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