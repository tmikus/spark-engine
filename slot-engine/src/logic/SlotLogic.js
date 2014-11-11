/**
 * Game logic for slot game.
 *
 * @param {SlotWorker} gameWorker Instance of the game worker.
 * @constructor
 * @class
 * @extends BaseGameLogic
 */
function SlotLogic(gameWorker)
{
    BaseGameLogic.apply(this, arguments);
}

SlotLogic.prototype = Class.extend(BaseGameLogic,
{
    /**
     * Called when the game is being loaded.
     * Developers can perform additional loading here.
     *
     * @param {Level} level Instance of the level.
     * @returns {Promise} Promise of loading of the game.
     */
    vLoadGameDelegate: function vLoadGameDelegate(level)
    {

    }
});