/**
 * Creates instance of the actor with specified ID.
 *
 * @param {number} id ID of the actor.
 * @constructor
 * @class
 */
function Actor(id)
{
    this.m_components = [];
    this.m_componentsMap = {};
    this.m_id = id;
}

Actor.prototype =
{
    /**
     * Array of components added to this actor.
     * @type {ActorComponent[]}
     */
    m_components: null,
    /**
     * Map of components and its ids.
     * @type {*}
     */
    m_componentsMap: null,
    /**
     * ID of the actor.
     * @type {number}
     */
    m_id: INVALID_ACTOR_ID,
    /**
     * Type of the actor.
     * @type {string}
     */
    m_type: null,
    /**
     * Adds the component to the actor.
     *
     * @param {ActorComponent} component Component to add to the actor.
     */
    addComponent: function addComponent(component)
    {
        this.m_components.push(component);
        this.m_componentsMap[component.vGetId()] = component;

        component.m_owner = this;
    },
    /**
     * Destroys the actor.
     */
    destroy: function destroy()
    {
        var components = this.m_components;
        var componentsLength = components.length;
        for (var componentIndex = 0; componentIndex < componentsLength; componentIndex++)
        {
            var component = components[componentIndex];
            component.vDestroy();
            component.m_owner = null;
        }

        this.m_components = [];
        this.m_componentsMap = {};
    },
    /**
     * Gets the component by the ID.
     *
     * @param {number} id ID of the component to find.
     * @returns {ActorComponent} Instance of the found component.
     */
    getComponentById: function getComponentById(id)
    {
        return this.m_componentsMap[id] || null;
    },
    /**
     * gets the component by the name.
     *
     * @param {string} name Name of the component to find.
     * @returns {ActorComponent} Instance of the found component.
     */
    getComponentByName: function getComponentByName(name)
    {
        return this.m_componentsMap[ActorComponent.GetIdFromName(name)] || null
    },
    /**
     * Initialises the actor with specified data.
     *
     * @param {*} data Data of the actor.
     * @returns {boolean} True if initialisation was successful; otherwise false.
     */
    initialise: function initialise(data)
    {
        if (data.type)
        {
            this.m_type = data.type;
            return true;
        }

        return false;
    },
    /**
     * Called when the component is requested to update.
     *
     * @param {GameTime} gameTime Instance of the game time.
     */
    onUpdate: function onUpdate(gameTime)
    {
        var components = this.m_components;
        var componentsLength = components.length;
        for (var componentIndex = 0; componentIndex < componentsLength; componentIndex++)
        {
            components[componentIndex].vOnUpdate(gameTime);
        }
    },
    /**
     * Called after the initialisation is done.
     * Here can go more initialisation.
     */
    postInitialise: function postInitialise()
    {
        var components = this.m_components;
        var componentsLength = components.length;
        for (var componentIndex = 0; componentIndex < componentsLength; componentIndex++)
        {
            components[componentIndex].vPostInitialise();
        }
    }
};