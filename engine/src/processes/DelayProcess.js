/**
 * Class responsible for delaying stuff.
 *
 * @param {number} delay Delay in seconds.
 * @constructor
 * @class
 */
function DelayProcess(delay)
{
    Process.apply(this, arguments);

    this.m_delay = delay;
}

DelayProcess.prototype = Class.extend(Process,
{
    /**
     * Delay to wait.
     * @type {number}
     */
    m_delay: null,
    /**
     * Elapsed time from starting the process.
     * @type {number}
     */
    m_elapsedTime: 0,
    /**
     * Called when the process was requested to update.
     *
     * @param {GameTime} gameTime Time of the game at the time of updating.
     * @protected
     * @virtual
     */
    _vOnUpdate: function _vOnUpdate(gameTime)
    {
        this.m_elapsedTime += gameTime.m_deltaTime;

        if (this.m_elapsedTime >= this.m_delay)
        {
            this.succeed();
        }
    }
});