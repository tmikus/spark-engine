/**
 * Class responsible for running processes taking more than one frame of the game.
 * @constructor
 * @class
 */
function Process()
{
    this.m_state = ProcessState.Uninitialized;
}

Process.prototype =
{
    /**
     * Child process - the process that is supposed to run after this finish.
     * @type {Process}
     */
    m_child: null,
    /**
     * State of the process.
     * @type {ProcessState}
     */
    m_state: null,
    /**
     * Method called when the process was aborted.
     * @protected
     * @virtual
     */
    _vOnAbort: function _vOnAbort()
    {
    },
    /**
     * Method called when the process has failed.
     * @protected
     * @virtual
     */
    _vOnFail: function _vOnFail()
    {
    },
    /**
     * Called when the process was initialized.
     * @protected
     * @virtual
     */
    _vOnInit: function _vOnInit()
    {
        this.m_state = ProcessState.Running;
    },
    /**
     * Called when the process has succeeded.
     * @protected
     * @virtual
     */
    _vOnSuccess: function _vOnSuccess()
    {
    },
    /**
     * Called when the process was requested to update.
     *
     * @param {GameTime} gameTime Time of the game at the time of updating.
     * @protected
     * @virtual
     */
    _vOnUpdate: notImplemented,
    /**
     * Attaches the child process to this process.
     *
     * @param {Process} child Child process to attach.
     */
    attachChild: function attachChild(child)
    {
        if (this.m_child)
        {
            this.m_child.attachChild(child);
        }
        else
        {
            this.m_child = child;
        }
    },
    /**
     * Marks the process as failed.
     */
    fail: function fail()
    {
        if (!this.isAlive())
        {
            SE_ERROR("Cannot fail process which is not alive!");
            return;
        }

        this.m_state = ProcessState.Failed;
    },
    /**
     * Checks if the process is alive.
     *
     * @returns {boolean} True if is alive.
     */
    isAlive: function isAlive()
    {
        return this.m_state == ProcessState.Running || this.m_state == ProcessState.Paused;
    },
    /**
     * Checks if the process is dead.
     *
     * @returns {boolean} True if is dead.
     */
    isDead: function isDead()
    {
        return this.m_state == ProcessState.Succeeded
            || this.m_state == ProcessState.Failed
            || this.m_state == ProcessState.Aborted;
    },
    /**
     * Checks if the process is paused.
     *
     * @returns {boolean} True if is paused.
     */
    isPaused: function isPaused()
    {
        return this.m_state == ProcessState.Paused;
    },
    /**
     * Checks if the process is removed.
     *
     * @returns {boolean} True if is removed.
     */
    isRemoved: function isRemoved()
    {
        return this.m_state == ProcessState.Removed;
    },
    /**
     * Pauses the process.
     */
    pause: function pause()
    {
        if (this.m_state == ProcessState.Running)
        {
            this.m_state = ProcessState.Paused;
        }
        else
        {
            SE_WARNING("Attempting to pause process which is not running!");
        }
    },
    /**
     * Removes the child process from this process.
     *
     * @returns {Process} Instance of the removed child process.
     */
    removeChild: function removeChild()
    {
        if (this.m_child)
        {
            var child = this.m_child;
            this.m_child = null;
            return child;
        }

        return null;
    },
    /**
     * Resumes the process.
     */
    resume: function resume()
    {
        if (this.m_state == ProcessState.Paused)
        {
            this.m_state = ProcessState.Running;
        }
        else
        {
            SE_WARNING("Attempting to resume process which is not paused!");
        }
    },
    /**
     * Marks the process as succeeded.
     */
    succeed: function succeed()
    {
        if (!this.isAlive())
        {
            SE_ERROR("Cannot succeed process which is not alive!");
            return;
        }

        this.m_state = ProcessState.Succeeded;
    },
    /**
     * Destroys the instance of the process.
     * Here you should add disposing of the resources.
     * @virtual
     */
    vDestroy: function vDestroy()
    {
    }
};