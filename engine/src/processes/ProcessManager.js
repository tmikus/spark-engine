/**
 * Creates instance of the process manager.
 * The manager is used to manage long running processes and keep the order of their
 * execution and lifecycle.
 * @constructor
 * @class
 */
function ProcessManager()
{
    this.m_processesList = [];
}

ProcessManager.prototype =
{
    /**
     * List of processes added to the process manager.
     * @type {Process[]}
     */
    m_processesList: null,
    /**
     * Aborts all processes.
     *
     * @param {boolean} immediate Should the processes be aborted now or in future?
     */
    abortAllProcesses: function abortAllProcesses(immediate)
    {
        var processes = this.m_processesList;
        var processesLength = processes.length;
        for (var processIndex = 0; processIndex < processesLength; ++processIndex)
        {
            var process = processes[processIndex];
            if (process.isAlive())
            {
                process.m_state = ProcessState.Aborted;

                if (immediate)
                {
                    process._vOnAbort();
                    process.vDestroy();
                    processes.splice(processIndex, 1);
                }
            }
        }
    },
    /**
     * Attaches the process to the process manager.
     *
     * @param {Process} process Process to attach to the process manager.
     */
    attachProcess: function attachProcess(process)
    {
        this.m_processesList.unshift(process);
    },
    /**
     * Clears the list of processes.
     */
    clearAllProcesses: function clearAllProcesses()
    {
        var processes = this.m_processesList;
        var processesLength = processes.length;
        for (var processIndex = 0; processIndex < processesLength; ++processIndex)
        {
            processes[processIndex].vDestroy();
        }

        this.m_processesList = [];
    },
    /**
     * Updates the processes added to the queue.
     *
     * @param {GameTime} gameTime Time elapsed since last update.
     * @return {number} Number of succeeded and failed processes.
     */
    updateProcesses: function updateProcesses(gameTime)
    {
        var failCount = 0;
        var successCount = 0;

        var processes = this.m_processesList;
        var processesLength = processes.length;
        for (var processIndex = 0; processIndex < processesLength; ++processIndex)
        {
            var process = processes[processIndex];

            // If process is uninitialized - initialize it
            if (process.m_state == ProcessState.Uninitialized)
            {
                process._vOnInit();
            }

            // If process is running - update it.
            if (process.m_state == ProcessState.Running)
            {
                process._vOnUpdate(gameTime);
            }

            // If process is dead - do some magic :P
            if (process.isDead())
            {
                switch (process.m_state)
                {
                    case ProcessState.Aborted:
                        process._vOnAbort();
                        ++failCount;
                        break;

                    case ProcessState.Failed:
                        process._vOnFail();
                        ++failCount;
                        break;

                    case ProcessState.Succeeded:
                        process._vOnSuccess();

                        var child = process.removeChild();
                        if (child)
                        {
                            this.attachProcess(child);
                        }
                        else
                        {
                            ++successCount;
                        }
                        break;
                }

                // Dispose the process.
                process.vDestroy();

                // Remove the process from the list.
                processes.splice(processIndex, 1);
            }
        }

        // Return numbers
        return ((successCount << 16) | failCount);
    }
};