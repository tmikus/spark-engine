/**
 * Manager used for running scripts.
 * Each script is running in sandboxed environment and should not affect other scripts running.
 *
 * @param {SparkEngineApp} game Instance of the to which this script manager belongs.
 * @constructor
 * @class
 */
function ScriptManager(game)
{
    this.m_game = game;
    this.m_scripts = [];
    this.m_scriptsMap = {};
}

ScriptManager.prototype =
{
    /**
     * Instance of the game to which this script manager belongs.
     * @type {SparkEngineApp}
     */
    m_game: null,
    /**
     * Array of scripts.
     * For faster navigation.
     * @type {Script[]}
     */
    m_scripts: null,
    /**
     * Map of scripts names and their executables.
     * @type {Object.<string, Script>}
     */
    m_scriptsMap: null,
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

            this.m_scripts.push(script);
            this.m_scriptsMap[scriptResource] = script;

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
        var scripts = this.m_scripts;
        var scriptsLength = scripts.length;
        for (var scriptIndex = 0; scriptIndex < scriptsLength; scriptIndex++)
        {
            scripts[scriptIndex].destroy();
        }
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
        // Try to find the script in scripts map.
        var script = this.m_scriptsMap[scriptResource];
        if (script)
        {
            return Promise.resolve(script);
        }

        // Load it only if it doesn't exists.
        return this.m_game.m_resourceManager.getResource(scriptResource)
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