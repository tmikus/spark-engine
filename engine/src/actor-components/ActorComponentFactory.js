/**
 * Creates instance of the Actor Component factory.
 * This factory can be used for creating components based on their type.
 * @constructor
 * @class
 */
function ActorComponentFactory()
{
    this.m_componentsMap = {};

    // TODO: For release purposes please replace this with something quicker
    this.register(ActorComponent.GetIdFromName(PlaneRenderComponent.s_name), PlaneRenderComponent);
    this.register(ActorComponent.GetIdFromName(ScriptComponent.s_name), ScriptComponent);
    this.register(ActorComponent.GetIdFromName(SphereRenderComponent.s_name), SphereRenderComponent);
    this.register(ActorComponent.GetIdFromName(TransformComponent.s_name), TransformComponent);
}

ActorComponentFactory.prototype =
{
    /**
     * Map of the components and their IDs.
     * @type {Object.<number, function(new:ActorComponent)>}
     */
    m_componentsMap: null,
    /**
     * Creates a component for specified component ID.
     *
     * @param {number} componentId ID of the component.
     * @returns {ActorComponent} Created actor component instance.
     */
    createById: function createById(componentId)
    {
        var ctor = this.m_componentsMap[componentId];
        if (!ctor)
        {
            SE_ERROR("Could not find component with specified ID!");
            return null;
        }

        return new ctor();
    },
    /**
     * Registers the component constructor with specified type.
     *
     * @param {number} componentId ID of the component.
     * @param {function():ActorComponent} componentConstructor Constructor of the component.
     * @returns {boolean} True if the registration was successful; otherwise false.
     */
    register: function register(componentId, componentConstructor)
    {
        if (this.m_componentsMap[componentId])
        {
            SE_WARNING("Component with this ID already exists!");
            return false;
        }

        this.m_componentsMap[componentId] = componentConstructor;
        return true;
    }
};