/**
 * Manager used for running scripts.
 * Each script is running in sandboxed environment and should not affect other scripts running.
 *
 * @param {SparkEngineWorker} gameWorker Instance of the worker to which this script manager belongs.
 * @constructor
 * @class
 */
function ScriptManager(gameWorker)
{
    this.m_gameWorker = gameWorker;
}

ScriptManager.prototype =
{
    /**
     * Instance of the worker to which this script manager belongs.
     * @type {SparkEngineWorker}
     */
    m_gameWorker: null,
    /**
     * Called when the script resource was loaded.
     *
     * @param {string} scriptResource Name of the script resource.
     * @param {string} scriptContent Content of the script resource.
     * @returns {Script}
     * @private
     */
    _onScriptLoaded: function _onScriptLoaded(scriptResource, scriptContent)
    {
        try
        {
            var script = new Script(scriptContent);
            script.initialise();
            return script;
        }
        catch (ex)
        {
            SE_ERROR("Could not initialise the script: " + scriptResource);
            throw ex;
        }
    },
    /**
     * Destroys the script manager.
     */
    destroy: function destroy()
    {

    },
    /**
     * Initialises the script manager.
     *
     * @returns {Promise} Promise of initialisation.
     */
    initialise: function initialise()
    {
        return Promise.resolve();
    },
    /**
     * Loads the script from the resource and initialises it.
     *
     * @param {string} scriptResource Name of the script resource.
     * @returns {Promise}
     */
    loadScript: function loadScript(scriptResource)
    {
        return this.m_gameWorker.m_resourceManager.getResource(scriptResource)
            .then(this._onScriptLoaded.bind(this, scriptResource))
            ["catch"](function ()
            {
                SE_ERROR("Could not load script: " + scriptResource);
            });
    },
    /**
     * Runs the script.
     *
     * @param {string} scriptResource Name of the script resource.
     * @returns {Promise}
     */
    runScript: function runScript(scriptResource)
    {
        return this.loadScript(scriptResource)
            .then(function (script)
            {
                script.run();
                return script;
            })
            ["catch"](function ()
            {
                SE_ERROR("Could not run script: " + scriptResource);
            });
    }
};