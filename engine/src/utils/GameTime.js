/**
 * Structure used for holding game time.
 * The time can be scaled and stopped.
 * @constructor
 */
function GameTime()
{

}

GameTime.prototype =
{
    /**
     * Time in seconds it took to complete the last frame.
     * Read only.
     * @type {number}
     */
    m_deltaTime: 0,
    /**
     * Total number of frames that have passed.
     * Read only.
     * @type {number}
     */
    m_frameCount: 0,
    /**
     * The real time in seconds since the game started.
     * Read only.
     * @type {number}
     */
    m_realTimeSinceStartup: 0,
    /**
     * The scale at which the time is passing.
     * This can be used fo slow motion effects.
     * @type {number}
     */
    m_timeScale: 1,
    /**
     * Time in seconds since the last level has been loaded
     * @type {number}
     */
    m_timeSinceLevelLoad: 0,
    /**
     * The time in seconds since last frame.
     * This time is unaffected by 'm_timeScale'.
     * Read only.
     * @type {number}
     */
    m_unscaledDeltaTime: 0,
    /**
     * The time in seconds since the game has started.
     * This time is unaffected by 'm_timeScale'.
     * Read only.
     * @type {number}
     */
    m_unscaledTime: 0,
    /**
     * Updates the game time with new time.
     */
    update: function update()
    {
        // TODO: Depending on the platform - some does not support window.performance.now
    }
};