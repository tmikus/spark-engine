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
     * Is the game in the process of rotating camera?
     * @type {boolean}
     */
    m_isRotatingCamera: false,
    /**
     * Original rotation of the camera.
     * @type {THREE.Vector3}
     */
    m_originalRotation: null,
    /**
     * Called when the user ended panning.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPanEnd: function _vOnPanEnd(e)
    {
        this.m_isRotatingCamera = false;
    },
    /**
     * Called when the user moved the finger when panning.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPanMove: function _vOnPanMove(e)
    {
        if (this.m_isRotatingCamera)
        {
            var camera = this.m_gameLogic.m_game.m_renderer.m_camera;
            if (!camera)
                return;

            var transform = camera.m_owner.m_transform;
            transform.m_localRotation.x = this.m_originalRotation.x + (e.deltaY / 6) * DEGREES_TO_RADIANS;
            transform.m_localRotation.y = this.m_originalRotation.y + (e.deltaX / 6) * DEGREES_TO_RADIANS;
            camera.updateMatrix();
        }
    },
    /**
     * Called when the user started panning.
     * For info about events see section "Event object" of http://hammerjs.github.io/api/
     *
     * @param e Event arguments.
     * @private
     * @virtual
     */
    _vOnPanStart: function _vOnPanStart(e)
    {
        this.m_isRotatingCamera = true;

        var camera = this.m_gameLogic.m_game.m_renderer.m_camera;
        if (!camera)
            return;

        this.m_originalRotation = camera.m_owner.m_transform.m_localRotation.clone();
    },
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
