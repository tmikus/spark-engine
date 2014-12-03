/**
 * Creates a scene node used for rendering an actor in the scene.
 *
 * @param {Actor} actor Actor which should be rendered.
 * @param {THREE.Object3D} sceneObject Object to render.
 * @constructor
 */
function SceneNode(actor, sceneObject)
{
    this.m_actor = actor;
    this.m_sceneObject = sceneObject;
}

SceneNode.prototype =
{
    /**
     * Actor to which this node is assigned.
     * @type {Actor}
     */
    m_actor: null,
    /**
     * Scene object rendered by this scene node.
     * @type {THREE.Object3D}
     */
    m_sceneObject: null,
    /**
     * Called after rendering the scene node.
     */
    onPostRender: function onPostRender()
    {

    },
    /**
     * Called before rendering the scene node.
     */
    onPreRender: function onPreRender()
    {
        var sceneObject = this.m_sceneObject;
        var transform = this.m_actor.m_transform;

        var position = transform.m_localPosition;
        var rotation = transform.m_localRotation;
        var scale = transform.m_localScale;

        sceneObject.position.x = position.x;
        sceneObject.position.y = position.y;
        sceneObject.position.z = position.z;

        sceneObject.rotation.x = rotation.x;
        sceneObject.rotation.y = rotation.y;
        sceneObject.rotation.z = rotation.z;

        sceneObject.scale.x = scale.x;
        sceneObject.scale.y = scale.y;
        sceneObject.scale.z = scale.z;

        sceneObject.updateMatrix();
    }
};