/**
 * Component responsible for transforming position of the actor.
 * @constructor
 * @class
 * @extends ActorComponent
 */
function TransformComponent()
{
    ActorComponent.apply(this);

    this.m_position = new THREE.Vector3();
    this.m_rotation = new THREE.Vector3();
    this.m_scale = new THREE.Vector3();
}

TransformComponent.s_name = "TransformComponent";

TransformComponent.prototype = Class.extend(ActorComponent,
{
    /**
     * Position vector of the actor.
     * @type {THREE.Vector3}
     */
    m_position: null,
    /**
     * Rotation vector of the actor.
     * @type {THREE.Vector3}
     */
    m_rotation: null,
    /**
     * Scale vector of the actor.
     * @type {THREE.Vector3}
     */
    m_scale: null,
    /**
     * Gets the name of the component.
     * @returns {string} Name of the component.
     */
    vGetName: function vGetName()
    {
        return TransformComponent.s_name;
    },
    /**
     * Initialises the Actor Component.
     *
     * @param {*} data Data of the component.
     * @returns {Promise} Promise of initialisation of component
     */
    vInitialise: function vInitialise(data)
    {
        var position = data.position;
        var rotation = data.rotation;
        var scale = data.scale;

        this.m_position = new THREE.Vector3(position[0], position[1], position[2]);
        this.m_rotation = new THREE.Vector3(rotation[0] * DEGREES_TO_RADIANS, rotation[1] * DEGREES_TO_RADIANS, rotation[2] * DEGREES_TO_RADIANS);
        this.m_scale = new THREE.Vector3(scale[0], scale[1], scale[2]);

        return Promise.resolve();
    }
});