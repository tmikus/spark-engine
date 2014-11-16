/**
 * Component responsible for transforming position of the actor.
 * @constructor
 * @class
 * @extends ActorComponent
 */
function TransformComponent()
{
    ActorComponent.apply(this);

    this.m_position = [0, 0, 0];
    this.m_rotation = [0, 0, 0];
    this.m_scale = [0, 0, 0];
}

TransformComponent.s_name = "TransformComponent";

TransformComponent.prototype = Class.extend(ActorComponent,
{
    /**
     * Position vector of the actor.
     * @type {number[]}
     */
    m_position: null,
    /**
     * Rotation vector of the actor.
     * @type {number[]}
     */
    m_rotation: null,
    /**
     * Scale vector of the actor.
     * @type {number[]}
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
        this.m_position = data.position;
        this.m_rotation = data.rotation;
        this.m_scale = data.scale;

        return Promise.resolve();
    }
});