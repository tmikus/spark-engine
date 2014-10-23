/**
 * Structure used for holding game time.
 * The time can be scaled and stopped.
 * @constructor
 * @class
 */
function GameTime()
{
    // Initialise the last frame time
    this.m_lastFrameSystemTime = performance.now();
}

GameTime.prototype =
{
    /**
     * Time in milliseconds at the time of last frame.
     * @type {number}
     * @private
     */
    m_lastFrameSystemTime: 0,
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
     * The scale at which the time is passing.
     * This can be used fo slow motion effects.
     * @type {number}
     */
    m_timeScale: 1,
    /**
     * Time in seconds since the last level has been loaded.
     * @type {number}
     */
    m_timeSinceLevelLoad: 0,
    /**
     * The time in seconds since the game started.
     * Read only.
     * @type {number}
     */
    m_timeSinceStartup: 0,
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
    m_unscaledTimeSinceStartup: 0,
    /**
     * Resets the time since the level was loaded.
     */
    resetTimeSinceLevelLoad: function resetTimeSinceLevelLoad()
    {
        this.m_timeSinceLevelLoad = 0;
    },
    /**
     * Updates the game time with new time.
     */
    update: function update()
    {
        // Maximum difference allowed for time to be treated as passing.
        // If the time difference is greater than the value specified here then the delta time will be marked as 0 (no time has passed)
        const maximumTimeDifference = 2000;

        // Calculate the delta real time.
        var currentFrameSystemTime = performance.now();
        var deltaSystemTime = currentFrameSystemTime - this.m_lastFrameSystemTime;

        // Is the delta time greater than maximum threshold?
        // For example was in debugger mode and we want to resume
        if (deltaSystemTime > maximumTimeDifference)
        {
            this.m_deltaTime = 0;
            this.m_unscaledDeltaTime = 0;
        }
        else
        {
            // Converting delta time to seconds
            this.m_unscaledDeltaTime = deltaSystemTime / 1000;

            // Increasing unscaled total time by delta time
            this.m_unscaledTimeSinceStartup += this.m_unscaledDeltaTime;

            // Scaling the delta time
            this.m_deltaTime = this.m_unscaledDeltaTime * this.m_timeScale;

            // Increasing time since startup
            this.m_timeSinceStartup += this.m_deltaTime;

            // Increasing time since level has been loaded.
            this.m_timeSinceLevelLoad += this.m_deltaTime;
        }

        // Increase the number of frames.
        this.m_frameCount++;

        // Store the last frame system time.
        this.m_lastFrameSystemTime = currentFrameSystemTime;
    }
};