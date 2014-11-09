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
    }
});