/**
 * Human view designed for slots game.
 *
 * @param {SlotLogic} gameLogic Slots game logic.
 * @constructor
 * @class
 * @extends HumanView
 */
function SlotHumanView(gameLogic)
{
    HumanView.apply(this, arguments);
}

SlotHumanView.prototype = Class.extend(HumanView,
{
});
