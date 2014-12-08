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
    /**
     * Called when the screen was tapped.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @protected
     * @virtual
     */
    _vOnTap: function _vOnTap(e)
    {
        var renderer = this.m_gameLogic.m_game.m_renderer;

        if (renderer.m_cameraObject)
        {
            var mouseVector = new THREE.Vector3((e.center.x / window.innerWidth) * 2 - 1, -(e.center.y / window.innerHeight) * 2 + 1, 0.1).unproject(renderer.m_cameraObject);
            var sceneObject = renderer.m_sceneManager.pickSceneObject(renderer.m_cameraObject.position, mouseVector.sub(renderer.m_cameraObject.position).normalize());

            if (sceneObject)
            {
                this.m_gameLogic.m_game.m_eventService.triggerEvent(new EventData_ActorClicked(sceneObject.object.userData.actorId));
            }
        }
    }
});
