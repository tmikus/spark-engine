/**
 * Application built specifically to support slot games.
 * @constructor
 * @class
 * @extends SparkEngineApp
 */
function SlotApp()
{
    SparkEngineApp.apply(this, arguments);
}

SlotApp.prototype = Class.extend(SparkEngineApp,
{
    /**
     * Creates game logic used by the game.
     *
     * @returns {Promise} Promise of Game Logic creation.
     * @protected
     * @virtual
     */
    _vCreateGameLogic: function _vCreateGameLogic()
    {
        var gameLogic = new SlotLogic(this);

        return gameLogic.vInitialise()
            .then(function()
            {
                return gameLogic;
            });
    },
    /**
     * Gets the name of the resource file containing game options.
     *
     * @returns {string} Name of resource containing game options.
     * @protected
     * @virtual
     */
    _vGetGameOptionsResourceName: function _vGetGameOptionsResourceName()
    {
        return "options"
    },
    /**
     * Gets name of the resource containing levels configuration
     *
     * @returns {string} Name of the configuration resource.
     * @virtual
     */
    vGetLevelsConfigurationResourceName: function vGetLevelsConfigurationResourceName()
    {
        return "levels"
    }
});