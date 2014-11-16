/**
 * Component responsible for running script on "per-frame" basis.
 * @constructor
 * @class
 * @extends ActorComponent
 */
function ScriptComponent()
{
    ActorComponent.apply(this);
}

ScriptComponent.s_name = "ScriptComponent";

ScriptComponent.prototype = Class.extend(ActorComponent,
{
    /**
     * Instance of the actor script created from the loaded script.
     * @type {BaseActorScript}
     */
    m_actorScript: null,
    /**
     * Name of the script to run.
     * The script must export the constructor function and that class must extend BaseActorScript object.
     * @type {string}
     */
    m_scriptName: null,
    /**
     * Sets up loaded script.
     *
     * @param {Script} script Instance of the loaded script.
     * @private
     */
    _setupLoadedScript: function _setupLoadedScript(script)
    {
        // Running script once
        script.runOnce();

        // Instantiating actor script
        this.m_actorScript = new (script.getExports())(this.m_owner);
        return this.m_actorScript.vInitialise();
    },
    /**
     * Destroys the actor component.
     */
    vDestroy: function vDestroy()
    {
        this.m_actorScript.vDestroy();
    },
    /**
     * Gets the name of the component.
     * @returns {string} Name of the component.
     */
    vGetName: function vGetName()
    {
        return ScriptComponent.s_name;
    },
    /**
     * Initialises the Actor Component.
     *
     * @param {*} data Data of the component.
     * @returns {Promise} Promise of initialisation of component
     */
    vInitialise: function vInitialise(data)
    {
        this.m_scriptName = data.scriptName;

        return this.m_owner.m_game.m_scriptManager.loadScript(this.m_scriptName)
            .then(this._setupLoadedScript.bind(this))
            .catch(function ()
            {
                SE_ERROR("Could not initialise script component for script: " + data.scriptName);
            });
    },
    /**
     * Called when the component is requested to update.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        this.m_actorScript.vOnUpdate(gameTime);
    },
    /**
     * Called after the initialisation has been completed.
     */
    vPostInitialise: function vPostInitialise()
    {
        this.m_actorScript.vPostInitialise();
    }
});