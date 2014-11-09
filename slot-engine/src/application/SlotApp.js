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
     * Gets the game logic file URL
     *
     * @returns {string} URL to the game logic file.
     * @protected
     * @virtual
     */
    _vGetGameLogicUrl: function _vGetGameLogicUrl()
    {
        return "../../dist/slot-engine-logic.js";
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
        return "options.json"
    }
});