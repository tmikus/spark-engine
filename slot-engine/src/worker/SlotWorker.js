/**
 * Implementation of the Spark Engine Worker for slot games.
 * @constructor
 * @class
 * @extends SparkEngineWorker
 */
function SlotWorker()
{
    SparkEngineWorker.apply(this);
}

SlotWorker.prototype = Class.extend(SparkEngineWorker,
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
     * Gets name of the resource containing levels configuration
     *
     * @returns {string} Name of the configuration resource.
     * @virtual
     */
    vGetLevelsConfigurationResourceName: function vGetLevelsConfigurationResourceName()
    {
        return "levels.json"
    }
});